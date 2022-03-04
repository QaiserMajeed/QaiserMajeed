const mongoose = require('mongoose');

const DiscoverIdentitySchema = mongoose.Schema(
  {
    discover_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discover',
      required: 'Discover id is required.',
    },
    name: { type: String, required: true },
    status: { type: Number, default: 1 },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  'DiscoverIdentity',
  DiscoverIdentitySchema,
);
