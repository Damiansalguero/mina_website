const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpoTextSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Expotext", ExpoTextSchema);
