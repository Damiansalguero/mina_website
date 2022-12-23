const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnmeldungSchema = new Schema({
  location: String,
  date: String,
  name: String,
  organisation: String,
  membership: Array,
  street: String,
  zip: String,
  phone: String,
  email: String,
  assistance: Array,
  assistanceneed: String,
  aid: Array,
  aids: String,
  care: Array,
  caretaker: Array,
  volunteer: Array,
  allergy: Array,
  allergies: String,
  dietwish: String,
  orgafield: Array,
  description: String,
  wishes: String,
  personal: Array,
  newsletter: String
});

module.exports = mongoose.model("Anmeldung", AnmeldungSchema);
