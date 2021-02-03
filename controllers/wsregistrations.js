const Anmeldung = require("../models/wsregistration");
const { workshopregisterSchema } = require("../schemas.js");

module.exports.renderAnmeldung = (req, res) => {
  res.render("wsregister/register");
};
