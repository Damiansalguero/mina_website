const Timelinethree = require ("../models/timelinethree.js");
const { timelinethreeSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewTimelinethree = (req, res) => {
    res.render("timelinethreeposts/new");
  };

  module.exports.createTimelinethree = async (req, res, next) => {
    const timelinethree = await new Timelinethree(req.body.timelinethree);
    await timelinethree.save();
    req.flash("success", "Der Eintrag wurde hinzugefügt !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.renderEditTimelinetwo = async (req, res) => {
    const { id } = req.params;
    const timelinethree = await Timelinethree.findById(req.params.id);
    res.render("timelinethreeposts/edit", { timelinethree });
  };

  module.exports.renderEditTimelinethree = async (req, res) => {
    const { id } = req.params;
    const timelinethree = await Timelinethree.findById(req.params.id);
    res.render("timelinethreeposts/edit", { timelinethree });
  };

  module.exports.updateTimelinethree = async (req, res) => {
    const { id } = req.params;
    const timelinethree = await Timelinethree.findByIdAndUpdate(id, {
      ...req.body.timelinethree
    });
    await timelinethree.save();
    req.flash("success", "Der Zeitstrahl-Eintrag wurde erfolgreich aktualisiert !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.deleteTimelinethree = async (req, res) => {
    const { id } = req.params;
    await Timelinethree.findByIdAndDelete(id);
    res.redirect("/prozess-begleitung");
  };