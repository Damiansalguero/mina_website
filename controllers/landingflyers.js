const Flyer = require("../models/landingflyer");
const { landingFlyerSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewLandingFlyer = (req, res) => {
  res.render("landingflyerposts/new");
};

module.exports.createLandingFlyer = async (req, res, next) => {
  const flyer = await new Flyer(req.body.flyer);
  flyer.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  flyer.author = req.user._id;
  await flyer.save();
  req.flash("success", "Der Flyer wurde erfolgreich hinzugefügt!");
  res.redirect("/home");
};

module.exports.showLandingFlyer = async (req, res) => {
  const flyer = await Flyer.findById(req.params.id);
  if (!flyer) {
    req.flash("error", "Dieser Flyer existiert nicht mehr !");
    return res.redirect("/home");
  }
  res.render("landingflyerposts/show", { flyer });
};

module.exports.editLandingFlyer = async (req, res) => {
  const { id } = req.params;
  const flyer = await Flyer.findById(req.params.id);
  res.render("landingflyerposts/edit", { flyer });
};

module.exports.updateLandingFlyer = async (req, res) => {
  const { id } = req.params;
  const flyer = await Flyer.findByIdAndUpdate(id, {
    ...req.body.flyer
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  flyer.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await flyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }

  await flyer.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await flyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Der Flyer wurde erfolgreich aktualisiert");
  res.redirect("/home");
};

module.exports.deleteLandingFlyer = async (req, res) => {
  const { id } = req.params;
  await Flyer.findByIdAndDelete(id);
  res.redirect("/home");
};
