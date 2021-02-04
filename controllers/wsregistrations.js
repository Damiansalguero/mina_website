const Anmeldung = require("../models/wsregistration");
const Workshop = require("../models/workshop");
const { workshopregisterSchema } = require("../schemas.js");

module.exports.renderAnmeldung = async (req, res) => {
  const workshops = await Workshop.find({});
  res.render("wsregister/register", { workshops });
};
