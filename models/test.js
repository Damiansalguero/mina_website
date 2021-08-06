const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual("attach").get(function() {
  return this.url.replace("/upload", "/upload/fl_attachment:PDF,f_png");
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
  images: [ImageSchema]
});

module.exports = mongoose.model("Test", TestSchema);
