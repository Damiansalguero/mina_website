const Prozessthree = require("../models/processthree");
const { processThreeSchema } = require("../schemas.js");

module.exports.renderProcessThreeNew = (req, res) => {
    res.render("prozessthreetextposts/new");
  };

  module.exports.createProzessThree = async (req, res, next) => {
    const przthree = await new Prozessthree (req.body.przthree);
    przthree.author = req.user._id;
    await przthree.save();
    req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
    res.redirect("prozess-begleitung");
  };

  module.exports.renderEditProzessThree = async (req, res) => {
    const { id } = req.params;
    const przthree = await Prozessthree.findById(req.params.id);
    res.render("prozessthreetextposts/edit", { przthree });
  };

  module.exports.updateProzessThree = async (req, res) => {
    const { id } = req.params;
    const przthree = await Prozessthree.findByIdAndUpdate(id, {
      ...req.body.przthree,
    });
    await przthree.save();
    req.flash("success", "Der Eintrag wurde erfolgreich aktualisiert !");
    res.redirect("/prozess-begleitung");
  };