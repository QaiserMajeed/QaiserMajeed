const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger/logger");
const { paymentStatus } = require("../constants/user");

const UserSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: String,
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: false },
    user_type: { type: Number, required: true },
    status: { type: Number, default: 1 },
    payment_status: { type: String, default: paymentStatus.NOT_PAYED },
    partner: {
      advCode: { type: String, required: false },
      initialRegistrationsLimit: { type: Number, required: false },
      currentRegistrationsLimit: { type: Number, required: false },
      customerId: { type: String, required: false },
      users: [
        {
          _id: false,
          type: mongoose.Schema.Types.ObjectId,
          required: false,
        },
      ],
    },
    impacts: [
      {
        rank: { type: Number, default: null },
        discoverIdentity_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DiscoverIdentity",
          required: "DiscoverIdentity id is required.",
        },
      },
    ],
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
    promise: [String],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// Save token in user collection
UserSchema.methods.authToken = function () {
  const user = this;
  const secretKey = process.env.SECRET_KEY || "secretKey";
  const token = jwt.sign({ _id: user._id.toString() }, secretKey, {
    expiresIn: "2h",
  });
  user.tokens = user.tokens.concat({ token });
  logger.info("saving token: ", token);
  user.save(async (err) => {
    if (err) {
      logger.error(err);
    }
  });
  return token;
};

module.exports = mongoose.model("User", UserSchema);

/*
User types:
  > 0 for Super Admin
  > 1 for admin
  > 2 for manager
  > 3 for employee/user

Status:
  > 1 for active
  > 0 for inactive
*/
