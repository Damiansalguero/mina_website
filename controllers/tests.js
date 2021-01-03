const Test = require("../models/test");
const { testdataSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderTest = async (req, res) => {
  const test = await Test.find({});
  res.render("test", { test });
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
  res.render("testaktuell", { test });
};
