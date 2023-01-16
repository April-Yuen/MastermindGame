const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    score: {type: Number}
  });



module.exports = mongoose.model("User", userSchema)