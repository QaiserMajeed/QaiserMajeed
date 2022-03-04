const mongoose = require('mongoose');

const StorySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'User id is required.',
    },
    trials: [{ type: String }],
    triumphs: [{ type: String }],
    lessons: [{ type: String }],
    status: { type: Number, default: 1 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Story', StorySchema);
