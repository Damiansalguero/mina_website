const Test = require("../models/test");
const Post = require("../models/post");
// const { testdataSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderTest = async (req, res) => {
  const tests = await Test.find({});
  const posts = await Post.find({});
  res.render("test", { tests, posts });
};

module.exports.renderTestform = (req, res) => {
  res.render("testform");
};

module.exports.createTest = async (req, res, next) => {
  console.log("req.body.test", req.body.test);
  const test = await new Test(req.body.test);
  test.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  test.author = req.user._id;
  await test.save();

  //Flash message needs to be specified and declared here + Setup in app.js (middleware in app.use)
  req.flash("success", "Der Post wurde erfolgreich erstellt !");
  // res.redirect(`/posts/${post._id}`);
  res.redirect("/test");
};

module.exports.showTest = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    req.flash("error", "Dieser Post existiert nicht mehr !");
    return res.redirect("/mina/home");
  }
  res.render("testshow", { test });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(req.params.id);
  res.render("testedit", { test });
};

module.exports.updatetest = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findByIdAndUpdate(id, {
    ...req.body.test
  });
  req.flash("success", "Successfully updated campground");
  res.redirect(`/test`);
};

module.exports.deletetest = async (req, res) => {
  const { id } = req.params;
  await Test.findByIdAndDelete(id);
  res.redirect("/test");
};
