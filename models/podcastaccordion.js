const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PodcastAccordionSchema = new Schema({
  accordiontitleone: String,
  accordiontextone: String,
  accordiontitletwo: String,
  accordiontextwo: String,
  accordiontitlethree: String,
  accordiontexthree: String,
  accordiontitlefour: String,
  accordiontextfour: String
});

module.exports = mongoose.model("Podcastaccordion", PodcastAccordionSchema);
