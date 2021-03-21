const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual("attach").get(function() {
  return this.url.replace("/upload", "/upload/fl_attachment:PDF,f_pdf");
});

const PartizipSchema = new Schema({
  titleone: String,
  descriptionone: String,
  titletwo: String,
  descriptiontwo: String,
  images: [ImageSchema]
});

module.exports = mongoose.model(" Partizip", PartizipSchema);
