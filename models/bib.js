const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

ImageSchema.virtual("attach").get(function () {
  return this.url.replace("/upload", "/upload/fl_attachment:PDF,f_pdf");
});

const BibSchema = new Schema({
  title: String,
  images: [ImageSchema],
  description: String,
  autor: String,
  pub: String,
  year: String,
});

module.exports = mongoose.model("Bib", BibSchema);
