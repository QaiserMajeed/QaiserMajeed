const mongoose = require('mongoose');

const PurposeScore = mongoose.Schema({
  name: { type: String, required: true },
  ageRange: { type: String, required: true },
  email: { type: String, required: true },
  day: { type: Number, required: true },
  life: { type: Number, required: true },
  lifeIncludes: { type: Number, required: true },
  personalExistence: { type: Number, required: true },
  goals: { type: Number, required: true },
  dreams: { type: Number, required: true },
  legacy: { type: Number, required: true },
  lifeControl: { type: Number, required: true },
  currentMissions: { type: Number, required: true },
  purpose: { type: Number, required: true },
  result: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('purpose_score', PurposeScore);
