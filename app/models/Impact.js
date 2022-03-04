const mongoose = require("mongoose");

const LifePurpose = mongoose.Schema({
  _id: false,
  completed: { type: Boolean, default: false },
  year: { type: String, required: true },
  city: { type: String, required: true },
  familyClass: { type: String, required: true },
  familyRelations: { type: String, required: true },
  immediateFamily: { type: String, required: true },
  college: { type: String, required: true },
  major: { type: String, required: true },
  industry: { type: String, required: true },
  position: { type: String, required: true },
  childLove: { type: String, required: true },
  career: { type: String, required: true },
  momInspired: { type: String, required: true },
  momTaught: { type: String, required: true },
  dadInspired: { type: String, required: true },
  dadTaught: { type: String, required: true },
  parentsLesson: { type: String, required: true },
  adultDecision: { type: String, required: true },
  adversity: { type: String, required: true },
  talent1: { type: String, required: true },
  talent2: { type: String, required: true },
  talent3: { type: String, required: true },
  teachAbout: { type: String, required: true },
  improveArea: { type: String, required: true },
  mainPassion: { type: String, required: true },
  passion1: { type: String, required: true },
  passion2: { type: String, required: true },
  passion3: { type: String, required: true },
  peopleHelp: { type: String, required: true },
  helpReason: { type: String, required: true },
  purposeVerb: { type: String, required: true },
  purposeComponent: { type: String, required: true },
  purposeStatement: { type: String, required: true },
  purposeOutcome: { type: String, required: true },
  purposeFinal: { type: String, required: true },
  feedbackRate: { type: Number, required: false },
  teamFeedback: { type: String, required: false },
});

const PromiseStatements = mongoose.Schema({
  _id: false,
  promiseVerb: { type: String, required: true },
  promiseComponent: { type: String, required: true },
  finalPromise: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const impact = mongoose.Schema({
  _id: false,
  rank: { type: Number, required: true },
  verb: { type: String, required: true },
  identity: { type: String, required: true },
});

const PurposeDNA = mongoose.Schema({
  _id: false,
  identities: [{ type: String }],
  impacts: [impact],
  completed: { type: Boolean, default: false },
});

const ImpactSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User id is required.",
    },
    purposeDna: PurposeDNA,
    lifePurpose: LifePurpose,
    promiseStatements: PromiseStatements,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("impact", ImpactSchema);
