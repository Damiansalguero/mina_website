const Partflyer = require("../models/partizipflyer");
const { partFlyerSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewPartFlyer = (req, res) => {
  res.render("partflyerposts/new");
};

module.exports.createPartFlyer = async (req, res, next) => {
  const partflyer = await new Partflyer(req.body.partflyer);
  partflyer.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  partflyer.author = req.user._id;
  await partflyer.save();
  req.flash("success", "Der Flyer wurde erfolgreich hinzugefügt!");
  res.redirect("/partizipatives-projekt");
};

module.exports.showPartFlyer = async (req, res) => {
  const partflyer = await Partflyer.findById(req.params.id);
  if (!partflyer) {
    req.flash("error", "Dieser Flyer existiert nicht mehr !");
    return res.redirect("/home");
  }
  res.render("partflyerposts/show", { partflyer });
};

module.exports.editPartFlyer = async (req, res) => {
  const { id } = req.params;
  const partflyer = await Partflyer.findById(req.params.id);
  res.render("partflyerposts/edit", { partflyer });
};

module.exports.updatePartFlyer = async (req, res) => {
  const { id } = req.params;
  const partflyer = await Partflyer.findByIdAndUpdate(id, {
    ...req.body.partflyer,
  });
  const imgs = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  partflyer.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await partflyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  await partflyer.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await partflyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Der Flyer wurde erfolgreich aktualisiert");
  res.redirect("/partizipatives-projekt");
};

module.exports.deletePartFlyer = async (req, res) => {
  const { id } = req.params;
  await Partflyer.findByIdAndDelete(id);
  res.redirect("/partizipatives-projekt");
};
