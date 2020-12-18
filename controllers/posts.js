//////////////// MODEL IMPORT ///////////////////
const Post = require("../models/post");
const { dataSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.render("posts/landing", { posts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("posts/new");
};

module.exports.createPost = async (req, res, next) => {
  const post = await new Post(req.body.post);
  post.images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  post.author = req.user._id;
  await post.save();
  console.log(post);
  //Flash message needs to be specified and declared here + Setup in app.js (middleware in app.use)
  req.flash("success", "Der Post wurde erfolgreich erstellt !");
  // res.redirect(`/posts/${post._id}`);
  res.redirect(`/mina`);
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    req.flash("error", "Dieser Post existiert nicht mehr !");
    return res.redirect("/landing");
  }
  res.render("posts/show", { post });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(req.params.id);
  res.render("posts/edit", { post });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  post.images.push(...imgs);
  await post.save();
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
  req.flash("success", "Der Post wurde erfolgreich aktualisiert !");
  res.redirect(`/posts/${post._id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/landing");
};
