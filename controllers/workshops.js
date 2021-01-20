const Workshop = require("../models/workshop");
const { workshopSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  res.render("wsposts/index");
};

module.exports.renderNewWorkshop = (req, res) => {
  res.render("wsposts/new");
};

module.exports.createWorkshop = async (req, res, next) => {
  const workshop = await new Workshop(req.body.workshop);
  await workshop.save();
  req.flash("success", "Der Workshop wurde erfolgreich erstellt !");
  res.redirect("/mina/workshops");
};

module.exports.renderEditWorkshop = async (req, res) => {
  const { id } = req.params;
  const workshop = await Workshop.findById(req.params.id);
  res.render("wsposts/edit", { workshop });
};

module.exports.showWorkshop = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/mina/home");
  }

  res.render("wsposts/show", { workshop });
};

module.exports.updateWorkshop = async (req, res) => {
  const { id } = req.params;
  const workshop = await Workshop.findByIdAndUpdate(id, {
    ...req.body.workshop
  });
  await workshop.save();
  req.flash("success", "Der Kalendareintrag wurde erfolgreich aktualisiert !");
  res.redirect("/mina/workshops");
};

module.exports.deleteWorkshop = async (req, res) => {
  const { id } = req.params;
  await Workshop.findByIdAndDelete(id);
  res.redirect("/mina/workshops");
};
