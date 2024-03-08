const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimelinefourSchema = new Schema({
  auswahl: String,
  auftakt: String,
  grundlage: String,
  bedarf: String,
  idee: String,
  konzipierung: String,
  evaluation: String,
  vernetzung: String,
  abschluss: String
});

module.exports = mongoose.model("Timelinefour", TimelinefourSchema);
