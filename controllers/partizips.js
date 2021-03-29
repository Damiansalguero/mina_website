const Partizip = require("../models/partizip");
const Partizipgallery = require("../models/partizipgallery");
const { partizipSchema, PartizipgallerySchema } = require("../schemas.js");

module.exports.renderPartizipNew = (req, res) => {
  res.render("partiziptextposts/new");
};

module.exports.renderPartizipNewGallery = (req, res) => {
  res.render("partizipimgposts/new");
};

module.exports.createPartizip = async (req, res, next) => {
  const partizip = await new Partizip(req.body.partizip);
  partizip.author = req.user._id;
  await partizip.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/partizipatives-projekt");
};

module.exports.createPartizipgallery = async (req, res, next) => {
  const ptg = await new Partizipgallery(req.body.ptg);
  ptg.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  ptg.author = req.user._id;
  await ptg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
  res.redirect("/partizipatives-projekt");
};

module.exports.renderEditPartizip = async (req, res) => {
  const { id } = req.params;
  const partizip = await Partizip.findById(req.params.id);
  res.render("partiziptextposts/edit", { partizip });
};

module.exports.renderEditPartizipgallery = async (req, res) => {
  const { id } = req.params;
  const ptg = await Partizipgallery.findById(req.params.id);
  res.render("partizipimgposts/edit", { ptg });
};

module.exports.showPartizipGallery = async (req, res) => {
  const ptg = await Partizipgallery.findById(req.params.id);
  if (!ptg) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/workshops");
  }

  res.render("partizipimgposts/show", { ptg });
};

module.exports.updatePartizip = async (req, res) => {
  const { id } = req.params;
  const partizip = await Partizip.findByIdAndUpdate(id, {
    ...req.body.partizip,
  });
  await partizip.save();
  req.flash("success", "Der Text wurde erfolgreich aktualisiert !");
  res.redirect("/partizipatives-projekt");
};

module.exports.updatePartizipgallery = async (req, res) => {
  const { id } = req.params;
  const ptg = await Partizipgallery.findByIdAndUpdate(id, {
    ...req.body.ptg,
  });
  const imgs = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  ptg.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await ptg.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  await ptg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
  res.redirect("/partizipatives-projekt");
};

module.exports.deletePartizipgallery = async (req, res) => {
  const { id } = req.params;
  await Partizipgallery.findByIdAndDelete(id);
  req.flash("success", "Die Galerie wurde erfolgreich gelöscht!");
  res.redirect("/partizipatives-projekt");
};
