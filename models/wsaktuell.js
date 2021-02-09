const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WsnewSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Wsnew", WsnewSchema);
