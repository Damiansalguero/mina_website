const Workshopflyer = require("../models/wsflyer");
const { workshopFlyerSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");


module.exports.renderNewWorkshopFlyer = (req, res) => {
    res.render("wsflyerposts/new");
  };

module.exports.createWorkshopFlyer = async (req, res, next) => {
    const wsflyer = await new Workshopflyer(req.body.wsflyer);
    wsflyer.images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
    wsflyer.author = req.user._id;
    await wsflyer.save();
    req.flash("success", "Der Flyer wurde erfolgreich hinzugefügt!");
    res.redirect("/workshops");
  };

module.exports.showWorkshopFlyer = async (req, res) => {
    const wsflyer = await Workshopflyer.findById(req.params.id);
    if (!wsflyer) {
      req.flash("error", "Dieser Flyer existiert nicht mehr !");
      return res.redirect("/workshops");
    }
    res.render("wsflyerposts/show", { wsflyer });
  };

module.exports.renderEditWorkshopFlyer = async (req, res) => {
    const { id } = req.params;
    const wsflyer = await Workshopflyer.findById(req.params.id);
    res.render("wsflyerposts/edit", { wsflyer });
  };

module.exports.updateWorkshopFlyer = async (req, res) => {
    const { id } = req.params;
    const wsflyer = await Workshopflyer.findByIdAndUpdate(id, {
      ...req.body.wsflyer
    });
    const imgs = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
    wsflyer.images.push(...imgs);
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await wsflyer.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } }
      });
    }
  
    await wsflyer.save();
    if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await wsflyer.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } }
      });
    }
    req.flash("success", "Der Flyer wurde erfolgreich aktualisiert");
    res.redirect("/workshops");
  };

  module.exports.deleteWorkshopFlyer = async (req, res) => {
    const { id } = req.params;
    await Workshopflyer.findByIdAndDelete(id);
    res.redirect("/workshops");
  };