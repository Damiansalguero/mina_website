const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WsnewSchema = new Schema({
  title: String,
  description: String,
  accordiontitleone: String,
  accordiontextone: String,
  accordiontitletwo: String,
  accordiontextwo: String,
  accordiontitlethree: String,
  accordiontexthree: String,
  accordiontitlefour: String,
  accordiontextfour: String,
});

module.exports = mongoose.model("Wsnew", WsnewSchema);
