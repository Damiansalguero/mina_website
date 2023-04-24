const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PodcastAccordionSchema = new Schema({
  accordiontitle: String,
  accordiontext: String
});

module.exports = mongoose.model("Podcastaccordion", PodcastAccordionSchema);
