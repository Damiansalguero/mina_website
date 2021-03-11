const Partizip = require("../models/partizip");
const { partizipSchema } = require("../schemas.js");

module.exports.renderPartizipNew = (req, res) => {
  res.render("partiziptextposts/new");
};

module.exports.createPartizip = async (req, res, next) => {
  const partizip = await new Partizip(req.body.partizip);
  partizip.author = req.user._id;
  await partizip.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/partizipatives-projekt");
};

module.exports.renderEditPartizip = async (req, res) => {
  const { id } = req.params;
  const partizip = await Partizip.findById(req.params.id);
  res.render("partiziptextposts/edit", { partizip });
};

module.exports.updatePartizip = async (req, res) => {
  const { id } = req.params;
  const partizip = await Partizip.findByIdAndUpdate(id, {
    ...req.body.partizip
  });
  await partizip.save();
  req.flash("success", "Der Text wurde erfolgreich aktualisiert !");
  res.redirect("/partizipatives-projekt");
};
