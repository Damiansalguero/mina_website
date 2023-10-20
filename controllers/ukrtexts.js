const Ukrtext = require("../models/ukrtext");
const { ukrTextSchema } = require("../schemas.js");

module.exports.renderNewUkrtext = (req, res) => {
    res.render("ukrtextposts/new");
  };

module.exports.createUkrtext = async (req, res, next) => {
    const ukrtext = await new Ukrtext (req.body.ukrtext);
    ukrtext.author = req.user._id;
    await ukrtext.save();
    req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
    res.redirect("/ukraine");
  };

module.exports.renderEditUkrtext = async (req, res) => {
    const { id } = req.params;
    const ukrtext = await Ukrtext.findById(req.params.id);
    res.render("ukrtextposts/edit", { ukrtext });
  };

  module.exports.updateUkrtext = async (req, res) => {
    const { id } = req.params;
    const ukrtext = await Ukrtext.findByIdAndUpdate(id, {
      ...req.body.ukrtext,
    });
    await ukrtext.save();
    req.flash("success", "Der Text wurde erfolgreich aktualisiert !");
    res.redirect("/ukraine");
  };