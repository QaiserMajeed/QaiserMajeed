const mongoose = require('mongoose');

const IndividualEpaSchema = mongoose.Schema(
  {
    email: { type: String },
    name: { type: String },
    role: { type: String },
    team: { type: String },
    company: { type: String },
    registration_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EPARegistrationCode',
      Required: 'Registration Code Required',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      Required: 'User id required',
    },
    stress: { type: Number, required: true },
    energy: { type: Number, required: true },
    life: { type: Number, required: true },
    work: { type: Number, required: true },
    fulfillment: { type: Number, required: true },
    impact: { type: Number, required: true },
    stresswe: { type: Number, required: true },
    stressrel: { type: Number, required: true },
    stressfs: { type: Number, required: true },
    stressmw: { type: Number, required: true },
    energym: { type: Number, required: true },
    energyem: { type: Number, required: true },
    energyre: { type: Number, required: true },
    energyph: { type: Number, required: true },
    workstr: { type: Number, required: true },
    workval: { type: Number, required: true },
    workpa: { type: Number, required: true },
    workgo: { type: Number, required: true },
    lifestr: { type: Number, required: true },
    lifeval: { type: Number, required: true },
    lifepa: { type: Number, required: true },
    lifego: { type: Number, required: true },
    fulfillmentrel: { type: Number, required: true },
    fulfillmentmi: { type: Number, required: true },
    fulfillmentmo: { type: Number, required: true },
    fulfillmentrw: { type: Number, required: true },
    impactfr: { type: Number, required: true },
    impactfam: { type: Number, required: true },
    impactc: { type: Number, required: true },
    impactcc: { type: Number, required: true },

    status: { type: Number, default: 1 },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  'IndividualEpa',
  IndividualEpaSchema,
);
