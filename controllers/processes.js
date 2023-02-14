const Processgallery = require("../models/process");
const Prozess = require("../models/prozess");
const { processGallerySchema, prozessSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderProcessNew = (req, res) => {
  res.render("prozesstextposts/new");
};

module.exports.renderNewProcessGallery = (req, res) => {
  res.render("prozessimgposts/new");
};

module.exports.createProzess = async (req, res, next) => {
  const prozess = await new Prozess (req.body.prozess);
  prozess.author = req.user._id;
  await prozess.save();
  res.send("IT WORKED")
  // req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  // res.redirect("prozess-begleitung");
};

module.exports.createProzessGallery = async (req, res, next) => {
  const przg = await new Processgallery(req.body.przg);
  przg.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  przg.author = req.user._id;
  await przg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
  res.redirect("/prozess-begleitung");
};

module.exports.renderEditProzess = async (req, res) => {
  const { id } = req.params;
  const prozess = await Prozess.findById(req.params.id);
  res.render("prozesstextposts/edit", { prozess });
};

module.exports.renderEditProcessGallery = async (req, res) => {
  const { id } = req.params;
  const przg = await Processgallery.findById(req.params.id);
  res.render("prozessimgposts/edit", { przg });
};

module.exports.showProcessGallery = async (req, res) => {
  const przg = await Processgallery.findById(req.params.id);
  if (!przg) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/prozess-begleitung");
  }

  res.render("prozessimgposts/show", { przg });
};

module.exports.updateProzess = async (req, res) => {
  const { id } = req.params;
  const prozess = await Prozess.findByIdAndUpdate(id, {
    ...req.body.prozess,
  });
  await prozess.save();
  req.flash("success", "Der Eintrag wurde erfolgreich aktualisiert !");
  res.redirect("/prozess-begleitung");
};

module.exports.updateProcessGallery = async (req, res) => {
  const { id } = req.params;
  const przg = await Processgallery.findByIdAndUpdate(id, {
    ...req.body.przg,
  });
  const imgs = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  przg.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await przg.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  await przg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
  res.redirect("/prozess-begleitung");
};

module.exports.deleteProcessGallery = async (req, res) => {
  const { id } = req.params;
  await Processgallery.findByIdAndDelete(id);
  req.flash("success", "Die Galerie wurde erfolgreich gelöscht!");
  res.redirect("/prozess-begleitung");
};
