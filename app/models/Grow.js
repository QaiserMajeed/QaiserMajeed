const mongoose = require('mongoose');

const template = mongoose.Schema(
  {
    _id: false,
    key: { type: String },
    value: { type: Number },
  },
);

const GrowSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'User id is required.',
    },
    // name: { type: String, required: true },
    // email: { type: String, required: true },
    situations: {
      conflict1: [template],
      conflict2: [template],
      comfort1: [template],
      comfort2: [template],
    },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('grow', GrowSchema);
