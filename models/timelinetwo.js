const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimelinetwoSchema = new Schema({
  auswahl: String,
  kennenlern: String,
  bedarf: String,
  auswertung: String,
  idee: String,
  evaluation: String
});

module.exports = mongoose.model("Timelinetwo", TimelinetwoSchema);
