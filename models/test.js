const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual("thumbnail").get(function() {
  return this.url.replace("/upload", "/upload/w_200");
});

// const TestSchema = new Schema({
//   title: String,
//   description: String,
//   location: String,
//   images: [ImageSchema],
//   date: String
// });

const TestSchema = new Schema({
  title: String,
  location: String,
  location2: String,
  location3: String,
  online: String,
  images: [ImageSchema],
  date: String,
  description: String
});

module.exports = mongoose.model("Test", TestSchema);
