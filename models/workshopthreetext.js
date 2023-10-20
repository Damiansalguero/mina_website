const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkshopThreeTextSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Workshopthreetext", WorkshopThreeTextSchema);
