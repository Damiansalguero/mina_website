const Anmeldung = require("../models/wsregistration");
const Workshop = require("../models/workshop");
const { workshopregisterSchema } = require("../schemas.js");

module.exports.renderAnmeldung = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  res.render("wsregister/register", { workshop });
};
