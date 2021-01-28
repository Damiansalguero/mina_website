const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
  title: String,
  date: String,
  phase: String,
  description: String
});

module.exports = mongoose.model("Timeline", TimelineSchema);
