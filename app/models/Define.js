const mongoose = require('mongoose');

const DefineSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'User id is required.',
  },
  // Discover My Story
  year: { type: String, default: '' },
  city: { type: String, default: '' },
  familyClass: { type: String, default: '' },
  familyRelations: { type: String, default: '' },
  immediateFamily: { type: String, default: '' },
  college: { type: String, default: '' },
  major: { type: String, default: '' },
  industry: { type: String, default: '' },
  position: { type: String, default: '' },
  childLove: { type: String, default: '' },
  career: { type: String, default: '' },
  momInspired: { type: String, default: '' },
  momTaught: { type: String, default: '' },
  dadInspired: { type: String, default: '' },
  dadTaught: { type: String, default: '' },
  parentsLesson: { type: String, default: '' },
  // Formative Experiences
  adultDecision: { type: String, default: '' },
  adversity: { type: String, default: '' },
  // Talents
  talent1: { type: String, default: '' },
  talent2: { type: String, default: '' },
  talent3: { type: String, default: '' },
  // Capabilities
  teachAbout: { type: String, default: '' },
  improveArea: { type: String, default: '' },
  // Passions
  passion1: { type: String, default: '' },
  passion2: { type: String, default: '' },
  passion3: { type: String, default: '' },
  passion4: { type: String, default: '' },
  // Philanthropy
  peopleHelp: { type: String, default: '' },
  helpReason: { type: String, default: '' },
  // Purpose
  purposeFinal: { type: String, default: '' },
  purposeStatement: { type: Number, default: '' },
  teamFeedback: { type: String, default: '' },
  purposeVerb: { type: String, default: '' },
  purposeComponent: { type: String, default: '' },

  status: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Define', DefineSchema);
