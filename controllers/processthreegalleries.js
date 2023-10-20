const Processthreegallery = require("../models/processthreegallery");
const { processThreeGallerySchema} = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewProcessGallery = (req, res) => {
    res.render("prozessthreeimgposts/new");
  };

  module.exports.createProcessThreeGallery = async (req, res, next) => {
    const przgthree = await new Processthreegallery(req.body.przgthree);
    przgthree.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    przgthree.author = req.user._id;
    await przgthree.save();
    req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.renderEditProcessThreeGallery = async (req, res) => {
    const { id } = req.params;
    const przg = await Processthreegallery.findById(req.params.id);
    res.render("prozessthreeimgposts/edit", { przgthree });
  };

  module.exports.showProcessThreeGallery = async (req, res) => {
    const przgthree = await Processthreegallery.findById(req.params.id);
    if (!przgthree) {
      req.flash("error", "Diese Galerie existiert nicht mehr !");
      return res.redirect("/prozess-begleitung");
    }
  
    res.render("prozessthreeimgposts/show", { przgthree });
  };

  module.exports.updateProcessThreeGallery = async (req, res) => {
    const { id } = req.params;
    const przgthree = await Processthreegallery.findByIdAndUpdate(id, {
      ...req.body.przgthree,
    });
    const imgs = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    przgthree.images.push(...imgs);
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await przgthree.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
    }
    await przgthree.save();
    req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.deleteProcessThreeGallery = async (req, res) => {
    const { id } = req.params;
    await Processthreegallery.findByIdAndDelete(id);
    req.flash("success", "Die Galerie wurde erfolgreich gelöscht!");
    res.redirect("/prozess-begleitung");
  };