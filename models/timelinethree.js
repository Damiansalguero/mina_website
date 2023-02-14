const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimelinethreeSchema = new Schema({
  auswahl: String,
  kennenlern: String,
  bedarf: String,
  auswertung: String,
  idee: String,
  evaluation: String
});

module.exports = mongoose.model("Timelinethree", TimelinethreeSchema);
