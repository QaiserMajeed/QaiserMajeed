const mongoose = require("mongoose");

const EmotionalIntlSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
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
        result: { type: Number, required: true },
    },
    { timestamps: true }, { strict: false }
);
module.exports = mongoose.model('emotional_intls', EmotionalIntlSchema);