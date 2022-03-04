const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const logger = require('../utils/logger/logger');
// const { getHash, comparePassword } = require('../utils/bcrypt/bcrypt');

const PartnerSchema = mongoose.Schema(
  {
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    // email: { type: String, required: true },
    advCode: { type: String, required: true, unique: true },
    initialRegistrationsLimit: { type: Number, require: true },
    currentRegistrationsLimit: { type: Number, require: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // password: { type: String, required: true },
    // tokens: [
    //   {
    //     token: { type: String, required: true },
    //   },
    // ],
  },
  { timestamps: true },
);

// PartnerSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     const match = await comparePassword(candidatePassword, this.password);
//     return match;
//   } catch (error) {
//     return error;
//   }
// };

// PartnerSchema.pre('save', async function (next) {
//   const user = this;

//   if (!user.isModified('password')) {
//     return next();
//   }

//   try {
//     user.password = await getHash(user.password);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// PartnerSchema.pre('updateOne', async function (next) {
//   const user = this;
//   if (!user._update.hasOwnProperty('password')) {
//     return next();
//   }

//   try {
//     user._update.password = await getHash(user._update.password);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });
// PartnerSchema.methods.authToken = function () {
//   const partner = this;
//   const secretKey = process.env.SECRET_KEY || 'secretKey';
//   const token = jwt.sign({ _id: partner._id.toString() }, secretKey, {
//     expiresIn: '24h',
//   });
//   partner.tokens = partner.tokens.concat({ token });
//   logger.info('saving token: ', token);
//   partner.save(async (err) => {
//     if (err) {
//       logger.error(err);
//     }
//   });
//   return token;
// };
module.exports = mongoose.model('partner', PartnerSchema);
