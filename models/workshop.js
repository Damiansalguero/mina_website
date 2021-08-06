const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
  date: String,
  title: String,
  location: String,
  type: String,
  capacity: String,
  description: String
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
