const mongoose = require("mongoose");
const scoreConstants = require("../constants/score");

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

const PurposeScore = mongoose.Schema(
  {
    _id: false,
    name: { type: String },
    ageRange: { type: String },
    email: { type: String },
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
    result: { type: Number, required: false },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const emotionalIntl = mongoose.Schema(
  {
    _id: false,
    relateToExperience: { type: Number, required: true },
    easyToAsk: { type: Number, required: true },
    peopleIChoose: { type: Number, required: true },
    financialSatisfied: { type: Number, required: true },
    financialDecisions: { type: Number, required: true },
    ableToUnderstand: { type: Number, required: true },
    financialAsking: { type: Number, required: true },
    financialHelp: { type: Number, required: true },
    financialProblems: { type: Number, required: true },
    financialDiffers: { type: Number, required: true },
    adapt: { type: Number, required: true },
    moneyPressure: { type: Number, required: true },
    thinkingDecisions: { type: Number, required: true },
    feelGrateful: { type: Number, required: true },
    outlook: { type: Number, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Purpose = mongoose.Schema(
  {
    DNA: PurposeDNA,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

Purpose.post("findOne", (e) => {
  if (e) {
    if (!e.hasOwnProperty("emotionalIntl"))
      e.emotionalIntl = scoreConstants.emptyEmotionalIntl;
    e.completed =
      e?.score?.completed && e?.pulse?.completed && e?.emotionalIntl?.completed;
  }
});

module.exports = mongoose.model("purpose", Purpose);
