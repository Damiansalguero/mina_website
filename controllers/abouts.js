const About = require("../models/about");
const { aboutSchema } = require("../schemas.js");

module.exports.renderNewAbout = (req, res) => {
  res.render("abouts/new");
};

module.exports.createAbout = async (req, res, next) => {
  const about = await new About(req.body.about);
  about.author = req.user._id;
  await about.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/");
};

module.exports.renderEditAbout = async (req, res) => {
  const { id } = req.params;
  const about = await About.findById(req.params.id);
  res.render("abouts/edit", { about });
};

module.exports.updateAbout = async (req, res) => {
  const { id } = req.params;
  const about = await About.findByIdAndUpdate(id, {
    ...req.body.about
  });
  await about.save();
  req.flash("success", "Die Sektion wurde erfolgreich aktualisiert !");
  res.redirect("/");
};
