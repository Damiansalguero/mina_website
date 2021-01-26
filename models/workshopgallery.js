const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual("thumbnail").get(function() {
  return this.url.replace("/upload", "/upload/w_200");
});

const WorkshopgalleryShema = new Schema({
  title: String,
  description: String,
  images: [ImageSchema]
});

module.exports = mongoose.model("Workshopgallery", WorkshopgalleryShema);
