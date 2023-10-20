const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UkrTextSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Ukrtext", UkrTextSchema);
