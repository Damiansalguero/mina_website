const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const catchAsync = require("../utils/catchAsync");
const { dataSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateData, isAuthor } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
//////////////// MODEL IMPORT ///////////////////
const Post = require("../models/post");

//////////////// MAIN OV ///////////////////
// campgrounds.index comes from the controller
router.get("/", catchAsync(posts.index));

//////////////// ADD ROUTE GET ///////////////////
router.get("/new", isLoggedIn, posts.renderNewForm);

//////////////// ADD ROUTE POST ///////////////////
router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateData,
  catchAsync(posts.createPost)
);

// router.post("/", upload.single("image"), (req, res) => {
//   console.log(req.body, req.file);
//   res.send("IT WORKED!!!!");
// });

//////////////// DV ROUTE ///////////////////
router.get("/:id", catchAsync(posts.showPost));

//////////////// EDIT ROUTE GET ///////////////////
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(posts.renderEditForm));
//////////////// EDIT ROUTE POST ///////////////////
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("image"),
  validateData,
  catchAsync(posts.updatePost)
);

//////////////// DELETE ROUTE CAMPGROUND ///////////////////
router.delete("/:id", catchAsync(posts.deletePost));
module.exports = router;
