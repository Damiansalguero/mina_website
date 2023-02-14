const Timelinetwo = require("../models/timelinetwo");
const { timelinetwoSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewTimelinetwo = (req, res) => {
  res.render("timelinetwoposts/new");
};

module.exports.createTimelinetwo = async (req, res, next) => {
  const timelinetwo = await new Timelinetwo(req.body.timelinetwo);
  await timelinetwo.save();
  req.flash("success", "Der Eintrag wurde hinzugefügt !");
  res.redirect("/prozess-begleitung");
};

module.exports.renderEditTimelinetwo = async (req, res) => {
  const { id } = req.params;
  const timelinetwo = await Timelinetwo.findById(req.params.id);
  res.render("timelinetwoposts/edit", { timelinetwo });
};

module.exports.showTimelinetwo = async (req, res) => {
  const timelinetwo = await Timelinetwo.findById(req.params.id);
  if (!timelinetwo) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/prozess-begleitung");
  }

  res.render("timelines/show", { timeline });
};

module.exports.updateTimelinetwo = async (req, res) => {
  const { id } = req.params;
  const timelinetwo = await Timelinetwo.findByIdAndUpdate(id, {
    ...req.body.timelinetwo
  });
  await timelinetwo.save();
  req.flash("success", "Der Zeitstrahl-Eintrag wurde erfolgreich aktualisiert !");
  res.redirect("/prozess-begleitung");
};

module.exports.deleteTimelinetwo = async (req, res) => {
  const { id } = req.params;
  await Timelinetwo.findByIdAndDelete(id);
  res.redirect("/prozess-begleitung");
};
