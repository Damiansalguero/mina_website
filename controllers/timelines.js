const Timeline = require("../models/timeline");
const { timelineSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewTimeline = (req, res) => {
  res.render("timelines/new");
};

module.exports.createTimenline = async (req, res, next) => {
  const timeline = await new Timeline(req.body.timeline);
  await timeline.save();
  req.flash("success", "Der Eintrag wurde hinzugefügt !");
  res.redirect("/mina/prozess-begleitung");
};

module.exports.renderEditTimeline = async (req, res) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(req.params.id);
  res.render("timelines/edit", { timeline });
};

module.exports.showTimeline = async (req, res) => {
  const timeline = await Timeline.findById(req.params.id);
  if (!timeline) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/mina/prozess-begleitung");
  }

  res.render("timelines/show", { timeline });
};

module.exports.updateTimeline = async (req, res) => {
  const { id } = req.params;
  const timeline = await Timeline.findByIdAndUpdate(id, {
    ...req.body.timeline
  });
  await timeline.save();
  req.flash("success", "Der Workshop wurde erfolgreich aktualisiert !");
  res.redirect("/mina/prozess-begleitung");
};

module.exports.deleteTimeline = async (req, res) => {
  const { id } = req.params;
  await Timeline.findByIdAndDelete(id);
  res.redirect("/mina/prozess-begleitung");
};