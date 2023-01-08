const Begleitungsgallery = require("../models/begleitung");
const { begleitungsGallerySchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewBegleitungsGallery = (req, res) => {
    res.render("begleitungsposts/new")
};

module.exports.createBegleitungsGallery = async (req, res, next) => {
    const bglg = await new Begleitungsgallery(req.body.bglg);
    bglg.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    bglg.author = req.user._id;
    await bglg.save();
    req.flash("success", "Die Gallerie wurde erfolgreich erstellt !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.renderEditBegleitungsGallery = async (req, res) => {
    const {id} = req.params;
    const bglg = await Begleitungsgallery.findById(req.params.id);
    res.render("begleitungsposts/edit", {bglg});
  };

  module.exports.showBegleitungsGallery = async (req, res) => {
    const bglg = await Begleitungsgallery.findById(req.params.id);
    if (!bglg) {
      req.flash("error", "Dieser Eintrag existiert nicht mehr !");
      return res.redirect("/prozess-begleitung");
    }
  
    res.render("begleitungsposts/show", { bglg });
  };

  module.exports.updateBegleitungsGallery = async (req, res) => {
    const { id } = req.params;
    const bglg = await Begleitungsgallery.findByIdAndUpdate(id, {
      ...req.body.bglg,
    });
    const imgs = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    bglg.images.push(...imgs);
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await bglg.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
    }
    await bglg.save();
    req.flash("success", "Die Gallerie wurde erfolgreich aktualisiert !");
    res.redirect("/prozess-begleitung");
  };

  module.exports.deleteBegleitungsGallery = async (req, res) => {
    const { id } = req.params;
    await Begleitungsgallery.findByIdAndDelete(id);
    req.flash("success", "Die Galerie wurde erfolgreich gelöscht!");
    res.redirect("/prozess-begleitung");
  };