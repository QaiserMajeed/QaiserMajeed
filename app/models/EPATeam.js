const mongoose = require('mongoose');

const EPATeamSchema = mongoose.Schema({
  team_name: { type: String, required: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IndividualEpa',
    required: 'IndividualEpa id is required.',
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    Required: 'User id required',
  },
  status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('EPATeam', EPATeamSchema);
