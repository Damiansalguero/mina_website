const Wsnew = require("../models/wsaktuell");
const { wsnewSchema } = require("../schemas.js");

module.exports.renderWsnews = (req, res) => {
  res.render("wsaktuellposts/new");
};

module.exports.createWsnews = async (req, res, next) => {
  const wsnew = await new Wsnew(req.body.wsnew);
  wsnew.author = req.user._id;
  await wsnew.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/workshops");
};

module.exports.renderEditWsnews = async (req, res) => {
  const { id } = req.params;
  const wsnew = await Wsnew.findById(req.params.id);
  res.render("wsaktuellposts/edit", { wsnew });
};

module.exports.updateWsnews = async (req, res) => {
  const { id } = req.params;
  const wsnew = await Wsnew.findByIdAndUpdate(id, {
    ...req.body.wsnew,
  });
  await wsnew.save();
  req.flash("success", "Der Text wurde erfolgreich aktualisiert !");
  res.redirect("/workshops");
};
