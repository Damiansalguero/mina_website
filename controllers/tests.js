const Test = require("../models/test");
const Post = require("../models/post");
const { dataSchema, testdataSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderTest = async (req, res) => {
  const tests = await Test.find({});
  const posts = await Post.find({});
  res.render("tests/index", { tests, posts });
};

module.exports.renderTestform = (req, res) => {
  res.render("tests/new");
};

module.exports.createTest = async (req, res, next) => {
  const test = await new Test(req.body.test);
  test.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  test.author = req.user._id;
  await test.save();
  req.flash("success", "Der Test wurde erfolgreich erstellt !");
  res.redirect("/test");
};

module.exports.showTest = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    req.flash("error", "Dieser Test existiert nicht mehr !");
    return res.redirect("/mina/home");
  }
  res.render("tests/test", { test });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(req.params.id);
  res.render("tests/edit", { test });
};

module.exports.updatetest = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findByIdAndUpdate(id, {
    ...req.body.test
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  test.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await test.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }

  await test.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await test.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Test wurde erfolgreich aktualisiert");
  res.redirect(`/test/${test._id}`);
};

module.exports.deletetest = async (req, res) => {
  const { id } = req.params;
  await Test.findByIdAndDelete(id);
  res.redirect("/test");
};
