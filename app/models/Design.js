const mongoose = require('mongoose');

const DesignSchema = mongoose.Schema({
  step: { type: String, required: true },
  inputs: { type: {} },
  status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Design', DesignSchema);
