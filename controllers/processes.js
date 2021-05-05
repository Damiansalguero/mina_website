const Processgallery = require("../models/process");
const { processGallerySchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewProcessGallery = (req, res) => {
  res.render("prozessimgposts/new");
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
