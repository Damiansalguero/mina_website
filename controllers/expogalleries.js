const Expogallery = require("../models/begleitung");
const { expoGallerySchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewExpoGallery = (req, res) => {
    res.render("expogalleryposts/new")
};

module.exports.createExpoGallery = async (req, res, next) => {
    const egl = await new Expogallery(req.body.egl);
    egl.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    egl.author = req.user._id;
    await egl.save();
    req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
    res.redirect("/wanderausstellung");
  };

  module.exports.renderEditExpoGallery = async (req, res) => {
    const {id} = req.params;
    const egl = await Expogallery.findById(req.params.id);
    res.render("expogalleryposts/edit", {egl});
  };

  module.exports.showExpoGallery = async (req, res) => {
    const egl = await Expogallery.findById(req.params.id);
    if (!egl) {
      req.flash("error", "Dieser Eintrag existiert nicht mehr !");
      return res.redirect("/wanderausstellung");
    }
  
    res.render("expogalleryposts/show", { egl });
  };

  module.exports.updateExpoGallery = async (req, res) => {
    const { id } = req.params;
    const egl = await Expogallery.findByIdAndUpdate(id, {
      ...req.body.egl,
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
      await egl.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
    }
    await egl.save();
    req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
    res.redirect("/wanderausstellung");
  };

  module.exports.deleteExpoGallery = async (req, res) => {
    const { id } = req.params;
    await Expogallery.findByIdAndDelete(id);
    req.flash("success", "Die Galerie wurde erfolgreich gelöscht!");
    res.redirect("/wanderausstellung");
  };