const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PodcastTextSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Podcasttext", PodcastTextSchema);
