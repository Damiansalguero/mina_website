const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/h_300");
});

ImageSchema.virtual("thumbnails").get(function () {
  return this.url.replace("/upload", "/upload/h_150");
});

const PartizipgalleryShema = new Schema({
  title: String,
  description: String,
  images: [ImageSchema],
});

module.exports = mongoose.model("Partizipgallery", PartizipgalleryShema);
