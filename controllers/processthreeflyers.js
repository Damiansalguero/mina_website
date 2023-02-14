const Prozessthreeflyer = require("../models/processthreeflyer");
const { processThreeFlyerSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewProzessThreeFlyer = (req, res) => {
    res.render("prozessthreeflyerposts/new");
  };


module.exports.createProzessThreeFlyer = async (req, res, next) => {
    const processthreeflyer = await new Prozessthreeflyer(req.body.processthreeflyer);
    processthreeflyer.images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
    processthreeflyer.author = req.user._id;
    await processthreeflyer.save();
    req.flash("success", "Der Flyer wurde erfolgreich hinzugefügt!");
    res.redirect("/prozess-begleitung");
  };

module.exports.showProzessThreeFlyer = async (req, res) => {
    const processthreeflyer = await Prozessthreeflyer.findById(req.params.id);
    if (!processthreeflyer) {
      req.flash("error", "Dieser Flyer existiert nicht mehr !");
      return res.redirect("/prozess-begleitung");
    }
    res.render("prozessthreeflyerposts/show", { processthreeflyer });
  };

module.exports.renderEditProzessThreeFlyer = async (req, res) => {
    const { id } = req.params;
    const processthreeflyer = await Prozessthreeflyer.findById(req.params.id);
    res.render("prozessthreeflyerposts/edit", { processthreeflyer });
  };

module.exports.updateProzessThreeFlyer = async (req, res) => {
    const { id } = req.params;
    const processthreeflyer = await Prozessthreeflyer.findByIdAndUpdate(id, {
      ...req.body.processthreeflyer
    });
    const imgs = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
    processthreeflyer.images.push(...imgs);
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await processthreeflyer.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } }
      });
    }
  
    await processthreeflyer.save();
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await processthreeflyer.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } }
      });
    }
    req.flash("success", "Der Flyer wurde erfolgreich aktualisiert");
    res.redirect("/prozess-begleitung");
  };

  module.exports.deleteProzessThreeFlyer = async (req, res) => {
    const { id } = req.params;
    await Prozessthreeflyer.findByIdAndDelete(id);
    res.redirect("/prozess-begleitung");
  };