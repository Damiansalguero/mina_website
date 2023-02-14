const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

const ProzessThreeSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Prozessthree", ProzessThreeSchema);
