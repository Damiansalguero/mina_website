const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  title: String,
  description: String,
  secondtitle: String,
  seconddescription: String
});

module.exports = mongoose.model("About", AboutSchema);
