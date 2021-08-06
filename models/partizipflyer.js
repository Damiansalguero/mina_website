const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("attach").get(function () {
  return this.url.replace("/upload", "/upload/fl_attachment:PDF,f_pdf");
});

const PartFlyerSchema = new Schema({
  title: String,
  images: [ImageSchema],
  description: String,
});

module.exports = mongoose.model("Partflyer", PartFlyerSchema);
