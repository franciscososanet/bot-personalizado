const mongoose = require("mongoose");

const twitch = new mongoose.Schema({
    streamer: { type: String, required: true },
    titulo: { type: String, required: true }
});

const model = mongoose.model("twitchSchema", twitch)

module.exports = model;
