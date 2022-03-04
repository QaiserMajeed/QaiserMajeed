const mongoose = require('mongoose');

const RegistrationCodeSchema = mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      Required: 'User id required',
    },
    availableCount: { type: Number, require: true },
    initialLicensesCount: { type: Number, require: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  'registration_code',
  RegistrationCodeSchema,
);
