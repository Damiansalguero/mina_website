const Expoflyer = require("../models/expoflyer");
const { expoFlyerSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");


module.exports.renderNewExpoFlyer = (req, res) => {
  res.render("expoflyerposts/new");
};

module.exports.createExpoFlyer = async (req, res, next) => {
  const expoflyer = await new Expoflyer(req.body.expoflyer);
  expoflyer.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  expoflyer.author = req.user._id;
  await expoflyer.save();
  req.flash("success", "Der Flyer wurde erfolgreich hinzugefügt!");
  res.redirect("/partizipatives-projekt");
};

module.exports.showExpoFlyer = async (req, res) => {
  const expoflyer = await Expoflyer.findById(req.params.id);
  if (!expoflyer) {
    req.flash("error", "Dieser Flyer existiert nicht mehr !");
    return res.redirect("/partizipatives-projekt");
  }
  res.render("expoflyerposts/show", { expoflyer });
};

module.exports.editExpoFlyer = async (req, res) => {
  const { id } = req.params;
  const expoflyer = await Expoflyer.findById(req.params.id);
  res.render("expoflyerposts/edit", { expoflyer });
};

module.exports.updateExpoFlyer = async (req, res) => {
  const { id } = req.params;
  const expoflyer = await Expoflyer.findByIdAndUpdate(id, {
    ...req.body.expoflyer
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  expoflyer.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await expoflyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }

  await expoflyer.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await expoflyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Der Flyer wurde erfolgreich aktualisiert");
  res.redirect("/partizipatives-projekt");
};

module.exports.deleteExpoFlyer = async (req, res) => {
  const { id } = req.params;
  await Expoflyer.findByIdAndDelete(id);
  res.redirect("/wanderausstellung");
};
