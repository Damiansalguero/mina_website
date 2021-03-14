const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
  bewerbung: String,
  kennenlern: String,
  bedarf: String,
  standpunkt: String,
  vernetzeins: String,
  idee: String,
  vernetzzwei: String,
  konzipierung: String,
  massnahme: String,
  evaluation: String,
  vernetzdrei: String,
  ergebnis: String
});

module.exports = mongoose.model("Timeline", TimelineSchema);
