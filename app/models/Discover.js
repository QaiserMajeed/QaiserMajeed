const mongoose = require('mongoose');

const DiscoverSchema = mongoose.Schema({
  identity_name: { type: String },
  description: { type: String },
  discoverIdentity_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscoverIdentity',
    required: 'DiscoverIdentity id is required.',
  }],
  status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Discover', DiscoverSchema);
