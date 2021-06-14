const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CalendarSchema = new Schema({
  title: String,
  date: String,
  link: String,
  description: String,
});

module.exports = mongoose.model("Calendar", CalendarSchema);
