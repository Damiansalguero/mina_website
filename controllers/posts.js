//////////////// MODEL IMPORT ///////////////////
const Post = require("../models/post");
const { dataSchema, reviewSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.render("posts/index", { posts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("posts/new");
};

module.exports.createCampground = async (req, res, next) => {
  const campground = await new Campground(req.body.campground);
  campground.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  //Flash message needs to be specified and declared here + Setup in app.js (middleware in app.use)
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      }
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Campground does not exist");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  campground.images.push(...imgs);
  await campground.save();
  //This line makes sure not the whole array is getting deleted
  if (req.body.deleteImages) {
    //This line deletes the images from cloudinary
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    //Deletes it also from mongo
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Successfully updated campground");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
};
