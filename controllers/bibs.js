const Bib = require("../models/bib");
const { bibSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderNewBib = (req, res) => {
  res.render("bibposts/new");
};

module.exports.createBib = async (req, res, next) => {
  const bib = await new Bib(req.body.bib);
  bib.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  bib.author = req.user._id;
  await bib.save();
  req.flash(
    "success",
    "Der Eintrag wurde erfolgreich zur Bibliothek hinzugefügt !"
  );
  res.redirect("/online-bibliothek");
};

module.exports.renderEditBib = async (req, res) => {
  const { id } = req.params;
  const bib = await Bib.findById(req.params.id);
  res.render("bibposts/edit", { bib });
};

module.exports.showBib = async (req, res) => {
  const bib = await Bib.findById(req.params.id);
  if (!bib) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/online-bibliothek");
  }
  res.render("bibposts/show", { bib });
};

module.exports.updateBib = async (req, res) => {
  const { id } = req.params;
  const bib = await Bib.findByIdAndUpdate(id, {
    ...req.body.bib
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  bib.images.push(...imgs);
  await bib.save();
  //This line makes sure not the whole array is getting deleted
  if (req.body.deleteImages) {
    //This line deletes the images from cloudinary
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    //Deletes it also from mongo
    await bib.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Der Eintrag wurde erfolgreich aktualisiert !");
  res.redirect("/online-bibliothek");
};

module.exports.deleteBib = async (req, res) => {
  const { id } = req.params;
  await Bib.findByIdAndDelete(id);
  req.flash(
    "success",
    "Der Eintrag wurde erfolgreich aus der Bibliothek gelöscht !"
  );
  res.redirect("/online-bibliothek");
};
