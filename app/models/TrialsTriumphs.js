const mongoose = require('mongoose');

const TrialsTriumphsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'User id is required.',
    },
    trials: [{ type: String }],
    triumphs: [{ type: String }],
    importantTrials: [{ type: String }],
    importantTriumphs: [{ type: String }],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('trialstriumphs', TrialsTriumphsSchema);
