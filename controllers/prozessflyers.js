const Prozessflyer = require("../models/prozessflyer");
const { prozessFlyerSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");


module.exports.renderNewProzessFlyer = (req, res) => {
  res.render("prozessflyerposts/new");
};

module.exports.createProzessFlyer = async (req, res, next) => {
  const prozessflyer = await new Prozessflyer(req.body.prozessflyer);
  prozessflyer.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  prozessflyer.author = req.user._id;
  await prozessflyer.save();
  req.flash("success", "Der Flyer wurde erfolgreich hinzugefügt!");
  res.redirect("/prozess-begleitung");
};

module.exports.showProzessFlyer = async (req, res) => {
  const prozessflyer = await Prozessflyer.findById(req.params.id);
  if (!prozessflyer) {
    req.flash("error", "Dieser Flyer existiert nicht mehr !");
    return res.redirect("/prozess-begleitung");
  }
  res.render("prozessflyerposts/show", { prozessflyer });
};

module.exports.editProzessFlyer = async (req, res) => {
  const { id } = req.params;
  const prozessflyer = await Prozessflyer.findById(req.params.id);
  res.render("prozessflyerposts/edit", { prozessflyer });
};

module.exports.updateProzessFlyer = async (req, res) => {
  const { id } = req.params;
  const prozessflyer = await Prozessflyer.findByIdAndUpdate(id, {
    ...req.body.prozessflyer
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  prozessflyer.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await prozessflyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }

  await prozessflyer.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await prozessflyer.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Der Flyer wurde erfolgreich aktualisiert");
  res.redirect("/prozess-begleitung");
};

module.exports.deleteProzessFlyer = async (req, res) => {
  const { id } = req.params;
  await Prozessflyer.findByIdAndDelete(id);
  res.redirect("/prozess-begleitung");
};
