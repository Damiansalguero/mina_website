const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartizipSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model(" Partizip", PartizipSchema);
