const Timelinefour = require ("../models/timelinefour.js");
const { timelinefourSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewTimelinefour = (req, res) => {
    res.render("timelinefourposts/new");
  };

  module.exports.createTimelinefour = async (req, res, next) => {
    const timelinefour = await new Timelinefour(req.body.timelinefour);
    await timelinefour.save();
    req.flash("success", "Der Eintrag wurde hinzugefügt !");
    res.redirect("/prozess-begleitung");
  };


  module.exports.renderEditTimelinefour = async (req, res) => {
    const { id } = req.params;
    const timelinefour = await Timelinefour.findById(req.params.id);
    res.render("timelinefourposts/edit", { timelinefour });
  };

  module.exports.updateTimelinefour = async (req, res) => {
    const { id } = req.params;
    const timelinefour = await Timelinefour.findByIdAndUpdate(id, {
      ...req.body.timelinefour
    });
    await timelinefour.save();
    req.flash("success", "Der Zeitstrahl-Eintrag wurde erfolgreich aktualisiert !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.deleteTimelinefour = async (req, res) => {
    const { id } = req.params;
    await Timelinefour.findByIdAndDelete(id);
    res.redirect("/prozess-begleitung");
  };