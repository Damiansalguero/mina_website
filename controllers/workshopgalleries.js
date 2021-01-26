const Workshopgallery = require("../models/workshopgallery");
const { workshopGallerySchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const workshopgalleries = await Workshopgallery.find({});
  res.render("wsimgposts/index", { workshopgalleries });
};

module.exports.renderNewWorkshopGallery = (req, res) => {
  res.render("wsimgposts/new");
};

module.exports.createWorkshopGallery = async (req, res, next) => {
  const wsg = await new Workshopgallery(req.body.wsg);
  wsg.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  wsg.author = req.user._id;
  await wsg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
  // res.redirect("/workshops/gallery");
  res.send("Gallerie wurde erstellt");
};

module.exports.showWorkshopGallery = async (req, res) => {
  const wsg = await Workshopgallery.findById(req.params.id);
  if (!wsg) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/mina/home");
  }

  res.render("wsimgposts/show", { wsg });
};

module.exports.renderEditWorkshopGallery = async (req, res) => {
  const { id } = req.params;
  const wsg = await Workshopgallery.findById(req.params.id);
  res.render("wsimgposts/edit", { wsg });
};

module.exports.updateWorkshopGallery = async (req, res) => {
  const { id } = req.params;
  const wsg = await Workshopgallery.findByIdAndUpdate(id, {
    ...req.body.wsg
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  wsg.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await wsg.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  await wsg.save();
  req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
  res.redirect("/mina/workshops");
};

module.exports.deleteWorkshopGallery = async (req, res) => {
  const { id } = req.params;
  await Workshopgallery.findByIdAndDelete(id);
  res.redirect("/mina/workshops");
};
