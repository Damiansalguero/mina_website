const Workshopthreetext = require("../models/workshopthreetext");
const { workshopThreeTextSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewWorkshopThreeText = (req, res) => {
  res.render("wsthreetextposts/new");
};

module.exports.createWorkshopThreeText = async (req, res, next) => {
  const wsthreetext = await new Workshopthreetext(req.body.wsthreetext);
  wsthreetext.author = req.user._id;
  await wsthreetext.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/2022-workshops");
};

module.exports.renderEditWorkshopThreeText = async (req, res) => {
  const { id } = req.params;
  const wsthreetext = await Workshopthreetext.findById(req.params.id);
  res.render("wsthreetextposts/edit", { wsthreetext });
};

module.exports.updateWorkshopThreeText = async (req, res) => {
    const { id } = req.params;
    const wsthreetext = await Workshopthreetext.findByIdAndUpdate(id, {
      ...req.body.wsthreetext,
    });
    await wsthreetext.save();
    req.flash("success", "Der Text wurde erfolgreich aktualisiert !");
    res.redirect("/2022-workshops");
  };