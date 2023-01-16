const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    targetNumber: {
        type: [String],
        required: true
    },
    guess: {
        type: [String],
        required: true
    },
    hint: {
        type: [String],
        required: true
    },
    guessCount: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Game", gameSchema)