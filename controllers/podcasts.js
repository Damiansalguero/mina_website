const Podcasttext = require("../models/podcasttext");
const Podcastaccordion = require("../models/podcastaccordion");
const { podcastTextSchema, podcastAccordionSchema } = require("../schemas.js");

module.exports.renderNewPodcastText = (req, res) => {
  res.render("podcasttextposts/new");
};

module.exports.renderNewPodcastAccordion = (req, res) => {
  res.render("podcastaccordionposts/new");
};

module.exports.createPodcastText = async (req, res, next) => {
  const podcasttext = await new Podcasttext(req.body.podcasttext);
  podcasttext.author = req.user._id;
  await podcasttext.save();
  req.flash("success", "Der Text-Eintrag wurde erfolgreich erstellt !");
  res.redirect("/podcast");
};

module.exports.createPodcastAccordion = async (req, res, next) => {
  const podcastaccordion = await new Podcastaccordion(
    req.body.podcastaccordion
  );
  podcastaccordion.author = req.user._id;
  await podcastaccordion.save();
  req.flash("success", "Der Akkordion-Eintrag wurde erfolgreich erstellt !");
  res.redirect("/podcast");
};

module.exports.renderEditPodcastText = async (req, res) => {
  const { id } = req.params;
  const podcasttext = await Podcasttext.findById(req.params.id);
  res.render("podcasttextposts/edit", { podcasttext });
};

module.exports.renderEditPodcastAccordion = async (req, res) => {
  const { id } = req.params;
  const podcastaccordion = await Podcastaccordion.findById(req.params.id);
  res.render("podcastaccordionposts/edit", { podcastaccordion });
};

module.exports.updatePodcastText = async (req, res) => {
  const { id } = req.params;
  const podcasttext = await Podcasttext.findByIdAndUpdate(id, {
    ...req.body.podcasttext,
  });
  await podcasttext.save();
  req.flash("success", "Der Text-Eintrag wurde erfolgreich aktualisiert !");
  res.redirect("/podcast");
};

module.exports.updatePodcastAccordion = async (req, res) => {
  const { id } = req.params;
  const podcastaccordion = await Podcastaccordion.findByIdAndUpdate(id, {
    ...req.body.podcastaccordion,
  });
  await podcastaccordion.save();
  req.flash(
    "success",
    "Der Akkordion-Eintrag wurde erfolgreich aktualisiert !"
  );
  res.redirect("/podcast");
};

module.exports.showPodcastAccordion = async (req, res) => {
  const podcastaccordion = await Podcastaccordion.findById(req.params.id);
  if (!podcastaccordion) {
    req.flash("error", "Dieser Akkordion-Eintrag existiert nicht mehr !");
    return res.redirect("/podcast");
  }
  res.render("podcastaccordionposts/show", { podcastaccordion });
};

module.exports.deletePodcastAccordion = async (req, res) => {
  const { id } = req.params;
  await Podcastaccordion.findByIdAndDelete(id);
  req.flash("success", "Der Akkordion-Eintrag erfolgreich gelöscht!");
  res.redirect("/podcast");
};
