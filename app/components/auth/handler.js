const async = require("async");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const responses = require("../../utils/responses/responses");
const validator = require("./validator");
const User = require("../../models/User");
const userRepository = require("../../repositories/user.repository");
const Stripe = require("../../stripe");
const SendMail = require("../../sendmail");
const { inputEmail } = require("../../constants/auth");
const { apiKey } = require("../../constants/sgMail");
const { calcOtp } = require("../../utils/helpers/helper");
const { getHash } = require("../../utils/bcrypt/bcrypt");
const partnerService = require("../partner/service");
const { comparePassword } = require("../../utils/bcrypt/bcrypt");
const mongodbResponseValidator = require("../../utils/responses/mongodb");
const codeService = require("../registration-code/service");
const { userTypes, userStringType } = require("../../constants/user");
const { paymentStatus } = require("../../constants/user");
var postmark = require("postmark");
const tokenRepo = require("../accessTokens/repository")

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      advCode,
      userType = userTypes.USER,
    } = await validator.register().validateAsync(req.body);

    const hash = await getHash(password);
    const userCount = await userRepository.count({
      email: email.toLowerCase(),
    });
    if (userCount) {
      return res.json(responses.error("invalid_credentials"));
    }
    const partnerCode = await partnerService.count({
      "partner.advCode": advCode,
      payment_status: paymentStatus.PAYED,
      "partner.currentRegistrationsLimit": { $gt: 0 },
    });
    if (!partnerCode) {
      return res.json(responses.error("invalid_adv_code"));
    }
    const user = await userRepository.create({
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      email: email.toLowerCase(),
      registration_code: advCode,
      payment_status: paymentStatus.NOT_PAYED,
      password: hash,
    });

    if (partnerCode) {
      await partnerService.updateByCode(advCode, {
        $inc: {
          "partner.currentRegistrationsLimit": -1,
        },
        $addToSet: {
          "partner.users": user._id,
        },
      });
    }
    return res.json(
      responses.successful({
        user: await userRepository.findOne(
          { _id: user._id },
          {
            first_name: 1,
            last_name: 1,
            email: 1,
            user_type: userTypes.USER,
            createdAt: 1,
            tokens: 1,
          }
        ),
        token: user.authToken(),
      })
    );
  } catch (e) {
    console.log(e);
    res.json(responses.error(e.message));
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = await validator.resendOtp().validateAsync(req.body);

    const validEmail = email.toLowerCase();
    const user = await userRepository.findOne(
      { email: validEmail },
      {
        otp: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
        user_type: 1,
        tokens: 1,
        createdAt: 1,
      }
    );
    if (user) {
      const otp = calcOtp();
      await userRepository.updateOne(
        { email: validEmail },
        {
          $set: {
            otp,
          },
        }
      );
      user.otp = otp;
      await SendMail.sendOtpMail(otp, user);
      return res.json(responses.successful([]));
    }
    return res.json(responses.error("invalid_credentials."));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// Verify otp for employee
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = await validator.verifyOTP().validateAsync(req.body);

    const validEmail = email.toLowerCase();
    const user = await userRepository.findOne(
      { email: validEmail },
      {
        otp: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
        user_type: 1,
        tokens: 1,
        createdAt: 1,
      }
    );
    if (user) {
      if (user.otp === otp) {
        user.otp = null;
        await userRepository.updateOne({ email: validEmail });
        const emailSplit = user.email.split(".");
        const emailHost = emailSplit.pop();
        const token = user.authToken();
        return res.json(
          responses.successful({
            user,
            token,
            proceed_to_payment: emailHost !== "edu",
          })
        );
      }
      return res.json(responses.error("Wrong OTP Number."));
    }
    return res.json(responses.error("Wrong email address."));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = await validator.login().validateAsync(req.body);

    const user = await userRepository.findOne({
      email: email.toLowerCase(),
      otp: null,
    });
    if (!user) {
      return res.json(responses.error("invalid_credentials"));
    }
    if (user.status === 1) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.json(responses.error("invalid_credentials"));
      }
      const token = user.authToken();
      return userRepository
        .findOne(
          { _id: user._id },
          {
            _id: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
            user_type: 1,
            tokens: 1,
            payment_status: 1,
            createdAt: 1,
            company_id: 1,
          }
        )
        .then((user) => {
          if (user && user._doc.hasOwnProperty("user_type"))
            user._doc.user_type = userStringType[user.user_type];
          return res.json(
            responses.successful({
              user,
              token,
              proceed_to_payment: true,
            })
          );
        })
        .catch((e) => res.json(responses.error(e.message)));
    }
    return res.json(responses.error("invalid_credentials"));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// login api for admin portal login (only Login admin where type === 1)
exports.adminPortalLogin = async (req, res) => {
  try {
    const { email, password } = await validator
      .adminPortalLogin()
      .validateAsync(req.body);

    const user = await userRepository.findOne({
      email: email.toLowerCase(),
      user_type: { $in: [0, 1] },
      otp: null,
    });

    if (!user) {
      return res.json(responses.error("invalid_credentials"));
    }

    if (user.hasOwnProperty("status") && user.status === 1) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        const token = user.authToken();
        const users = await userRepository.findOne(
          { _id: user._id },
          {
            _id: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
            user_type: 1,
            tokens: 1,
            createdAt: 1,
            company_id: 1,
            registration_code: 1,
          }
        );
        return res.json(
          responses.successful({
            user: users,
            token,
          })
        );
      }
      return res.json(responses.error("You have entered an invalid password."));
    }
    return res.json(
      responses.error("Account has been removed by JourneyLIFE.")
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// forgotPassword send email in user exists email id
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = await validator.forgotPassword().validateAsync(req.body);

    async.waterfall(
      [
        function (done) {
          crypto.randomBytes(90, (err, buf) => {
            const token = buf.toString("hex");
            done(err, token);
          });
        },
        function (token, done) {
          // TODO: change to userRepository
          User.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (!user) {
              res.json(responses.successful());
            } else if (user.status === 1) {
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 360000; // 6 minutes
              user.save((err) => {
                done(err, token, user);
              });
            } else {
              res.json(responses.successful());
            }
          });
        },
        function (token, user) {
          var client = new postmark.ServerClient(
            "a52948a0-9233-4a17-8620-08432d3607e4"
          );
          client
            .sendEmail({
              From: "support@trygobeyond.com",
              To: user.email,
              Subject: "Go Beyond: Reset Password",
              TextBody:
                "Hi " +
                user.first_name +
                ", \n\n" +
                "You are receiving this email because we received a password reset request for your account.\n\n" +
                `${process.env.FRONTENT_URL}/reset-password/${token}\n\n` +
                "If you did not request a password reset, no further action is required.\n\n" +
                "Thanks! \n\n" +
                "Go Beyond Team \n\n",
              MessageStream: "outbound",
            })
            .then(() => {
              res.json(responses.successful([]));
            })
            .catch((error) => {
              console.log(error);
              res.json(responses.error(error));
            });
        },
      ],
      (err) => {
        if (err) {
          res.json(responses.error(err));
        }
      }
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// show reset password url
exports.resetPasswordLink = async (req, res) => {
  try {
    const { token } = await validator
      .resetPasswordLink()
      .validateAsync(req.params);

    return res.json(
      responses.successful({
        user: await userRepository.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() },
        }),
      })
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // console.log(req.body);
    const { password, confirm_password: confirmPassword } = await validator
      .resetPassword()
      .validateAsync(req.body);

    const { token } = await validator
      .resetPasswordParams()
      .validateAsync(req.params);

    async.waterfall([
      async () => {
        // TODO: change to userRepository
        User.findOne(
          {
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          async (err, user) => {
            if (!err && user) {
              if (password === confirmPassword) {
                if (err) {
                  res.json(responses.error(err));
                } else {
                  user.password = await getHash(password);
                  user.resetPassword = undefined;
                  user.resetPasswordExpires = undefined;
                  user.save(async (err) => {
                    if (err) {
                      res.json(responses.error(err.message));
                    } else {
                      res.json(responses.successful([]));
                    }
                  });
                }
              } else {
                res.json(responses.error("invalid_credentials"));
              }
            } else {
              res.json(responses.error("invalid_credentials"));
            }
          }
        );
      },
    ]);
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// logout user all device
exports.logout = async (req, res) => {
  try {
    const { email } = await validator.logout().validateAsync(req.body);
    return userRepository
      .updateOne(
        { email: email.toLowerCase() },
        {
          $set: {
            tokens: [],
          },
        }
      )
      .then((result) => {
        if (mongodbResponseValidator.update(result, 1)) {
          return res.json(responses.successful([]));
        }
        return res.json(responses.error(`User with email ${email} not found`));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// check login status (api created by saying front-end dev)
exports.checkLogin = async (req, res) => {
  try {
    const { token } = await validator.checkLogin().validateAsync(req.params);

    userRepository
      .findOne(
        {
          "tokens.token": token,
        },
        {
          _id: 1,
          first_name: 1,
          last_name: 1,
          email: 1,
          user_type: 1,
          tokens: 1,
          createdAt: 1,
          company_id: 1,
          registration_code: 1,
        }
      )
      .then((user) => {
        if (
          user &&
          user.tokens[user.tokens.length - 1].token === req.body.token
        ) {
          return res.json(
            responses.successful({
              loggedIn: true,
              user,
            })
          );
        }
        return res.json(responses.successful({ loggedIn: false }));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.sendToken = async (req, res) => {
  try {
    const { token } = await validator.checkLogin().validateAsync(req.query);
    const tokenObj = await tokenRepo.findOne({ 'exercises.token': token }).populate('User')
    if (tokenObj === null) {
      return await res.json(responses.error("Please enter a valid URL "));
    }

    const user = await userRepository.findOne(
      { _id: tokenObj.user_id },
      {
        first_name: 1,
        last_name: 1,
        email: 1,
        user_type: userTypes.USER,
        createdAt: 1,
        tokens: 1,
      }
    );
    return res.json(
      responses.successful({
        user,
        token: user.authToken(),
      })
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
// // check login status (api created by saying front-end dev)
// exports.registrationPayment = async (req, res) => {
//   try {
//     const { token, coupon: reqCoupon } = await validator
//       .registrationPayment()
//       .validateAsync(req.body);

//     const userId = req.user._id;
//     let couponPercentage = 0;
//     if (reqCoupon) {
//       const coupon = await couponRepository.findOne(
//         { coupon: reqCoupon, is_active: 1 },
//         { coupon: 1, percentage: 1 }
//       );
//       // console.log('coupon: ', coupon.percentage);
//       if (coupon) {
//         couponPercentage = coupon.percentage;
//       }
//     }

//     if (couponPercentage >= 100) {
//       const user = await userRepository.findOne(
//         { _id: userId, status: 1 },
//         {
//           // phone: 1,
//           otp: 1,
//           first_name: 1,
//           last_name: 1,
//           user_type: 1,
//           payment_status: 1,
//           tokens: 1,
//           createdAt: 1,
//         }
//       );
//       if (user) {
//         user.payment_status = "paid";
//         user.payment_details = null;
//         user.save(async (err) => {
//           if (err) {
//             return res.json(responses.error(err.message));
//           }
//           return res.json(responses.successful({ transaction_id: null }));
//         });
//       }
//     } else {
//       Stripe(token, couponPercentage)
//         .then(async (result) => {
//           const transactionId = result.balance_transaction;
//           const user = await userRepository.findOne(
//             { _id: userId, status: 1 },
//             {
//               otp: 1,
//               first_name: 1,
//               last_name: 1,
//               user_type: 1,
//               payment_status: 1,
//               tokens: 1,
//               createdAt: 1,
//             }
//           );
//           if (user) {
//             user.payment_status = "paid";
//             user.payment_details = transactionId;
//             user.save(async (err) => {
//               if (err) {
//                 return res.json(responses.error(err.message));
//               }
//               return res.json(responses.successful({ transactionId }));
//             });
//           }
//         })
//         .catch((err) => {
//           res.json(responses.error(err));
//         });
//     }
//   } catch (e) {
//     res.json(responses.error(e.message));
//   }
// };

exports.addSuperAdmin = async (req, res) => {
  try {
    const user = await userRepository.findOne({ email: inputEmail });
    if (user) {
      return res.json(responses.error("invalid_credentials"));
    }
    const hash = await getHash("123456");
    const newUser = await userRepository.create({
      first_name: "Super",
      last_name: "Admin",
      company: "superadmin",
      user_type: 4,
      email: inputEmail,
      password: hash,
    });
    Object.prototype.hasOwnProperty.call(newUser, "first_name");
    res.json(
      responses.successful({
        user: await userRepository.findOne(
          { _id: newUser._id },
          {
            first_name: 1,
            last_name: 1,
            company: 1,
            email: 1,
            user_type: 1,
            createdAt: 1,
            tokens: 1,
          }
        ),
        token: user.authToken(),
      })
    );
  } catch (e) {
    res.json(responses.error(e.message));
  }
};

exports.generatePassword = (req, res) =>
  res.json(
    responses.successful({
      password: codeService.generateCode(12),
    })
  );
