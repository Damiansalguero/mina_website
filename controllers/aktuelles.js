const Aktuell = require("../models/aktuell");
const { aktuellesSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewAktuelles = (req, res) => {
  res.render("aktuellposts/new");
};

module.exports.createAktuelles = async (req, res, next) => {
  const aktuell = await new Aktuell(req.body.aktuell);
  aktuell.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  aktuell.author = req.user._id;
  await aktuell.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/");
};

module.exports.renderEditAktuelles = async (req, res) => {
  const { id } = req.params;
  const aktuell = await Aktuell.findById(req.params.id);
  res.render("aktuellposts/edit", { aktuell });
};

module.exports.showAktuelles = async (req, res) => {
  const aktuell = await Aktuell.findById(req.params.id);
  if (!aktuell) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/");
  }
  res.render("aktuellposts/show", { aktuell });
};

module.exports.updateAktuelles = async (req, res) => {
  const { id } = req.params;
  const aktuell = await Aktuell.findByIdAndUpdate(id, {
    ...req.body.aktuell
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  aktuell.images.push(...imgs);
  await aktuell.save();
  //This line makes sure not the whole array is getting deleted
  if (req.body.deleteImages) {
    //This line deletes the images from cloudinary
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    //Deletes it also from mongo
    await post.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Der Eintrag wurde erfolgreich aktualisiert !");
  res.redirect("/");
};
