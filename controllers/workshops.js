const Workshop = require("../models/workshop");
const Workshopgallery = require("../models/workshopgallery");
const { workshopSchema, workshopGallerySchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  res.render("wsposts/index");
};

module.exports.wsgallerien = async (req, res) => {
  const workshopgalleries = await Workshopgallery.find({});
  res.render("wsimgposts/index", { workshopgalleries });
};

module.exports.renderNewWorkshop = (req, res) => {
  res.render("wsposts/new");
};

module.exports.renderNewWorkshopGallery = (req, res) => {
  res.render("wsimgposts/new");
};

module.exports.createWorkshop = async (req, res, next) => {
  const workshop = await new Workshop(req.body.workshop);
  await workshop.save();
  req.flash("success", "Der Workshop wurde erfolgreich erstellt !");
  res.redirect("/workshops");
};

module.exports.createWorkshopGallery = async (req, res, next) => {
  const wsg = await new Workshopgallery(req.body.wsg);
  wsg.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  wsg.author = req.user._id;
  await wsg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
  res.redirect("/workshops");
};

module.exports.renderEditWorkshop = async (req, res) => {
  const { id } = req.params;
  const workshop = await Workshop.findById(req.params.id);
  res.render("wsposts/edit", { workshop });
};

module.exports.renderEditWorkshopGallery = async (req, res) => {
  const { id } = req.params;
  const wsg = await Workshopgallery.findById(req.params.id);
  res.render("wsimgposts/edit", { wsg });
};

module.exports.showWorkshop = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/workshops");
  }

  res.render("wsposts/show", { workshop });
};

module.exports.showWorkshopGallery = async (req, res) => {
  const wsg = await Workshopgallery.findById(req.params.id);
  if (!wsg) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/workshops");
  }

  res.render("wsimgposts/show", { wsg });
};

module.exports.updateWorkshop = async (req, res) => {
  const { id } = req.params;
  const workshop = await Workshop.findByIdAndUpdate(id, {
    ...req.body.workshop,
  });
  await workshop.save();
  req.flash("success", "Der Workshop wurde erfolgreich aktualisiert !");
  res.redirect("/workshops");
};

module.exports.updateWorkshopGallery = async (req, res) => {
  const { id } = req.params;
  const wsg = await Workshopgallery.findByIdAndUpdate(id, {
    ...req.body.wsg,
  });
  const imgs = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  wsg.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await wsg.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  await wsg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
  res.redirect("/workshops");
};

module.exports.deleteWorkshop = async (req, res) => {
  const { id } = req.params;
  await Workshop.findByIdAndDelete(id);
  req.flash("success", "Der Workshop erfolgreich gelöscht!");
  res.redirect("/workshops");
};

module.exports.deleteWorkshopGallery = async (req, res) => {
  const { id } = req.params;
  await Workshopgallery.findByIdAndDelete(id);
  req.flash("success", "Die Galerie wurde erfolgreich gelöscht!");
  res.redirect("/workshops");
};
