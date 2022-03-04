const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");

const AccessTokenSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: 'User id is required.',
        },
        exercises: [
            {
                exercise_name: { type: String, required: true },
                token: { type: String, required: true },
                isAvailed: { type: Boolean, default: false },
            }
        ],
        status: { type: Number, default: 1 },
        
    },
    { timestamps: true }
);


module.exports = mongoose.model("AccessTokens", AccessTokenSchema);


