const Test = require("../models/test");
const Post = require("../models/post");
const Workshop = require("../models/workshop");
const nodemailer = require("nodemailer");

const { dataSchema, testdataSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const tests = await Test.find({});
  res.render("tests/index", { tests });
};

module.exports.renderTest = async (req, res) => {
  // const tests = await Test.find({});
  // const posts = await Post.find({});
  res.render("tests/test");
};

module.exports.renderTestform = async (req, res) => {
  const workshops = await Workshop.find({});
  res.render("tests/new", { workshops });
};

module.exports.createTest = async (req, res, next) => {
  const test = await new Test(req.body.test);
  await test.save();
  req.flash("success", "Der Post wurde erfolgreich erstellt !");
  res.redirect("/test");
};

module.exports.showTest = async (req, res) => {
  const test = await Test.find({});
  res.render("tests/show", { test });
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
