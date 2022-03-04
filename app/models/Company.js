const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema(
  {
    registration_codes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegistrationCode',
        Required: 'Registration codes are required',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      Required: 'User id required',
    },
    company_name: { type: String, required: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Design id is required.',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Company', CompanySchema);
