const express = require("express");
const router = express.Router();
const begleitungs = require("../controllers/begleitungs");
const catchAsync = require("../utils/catchAsync");
const { begleitungsGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateBegleitungsGallery } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Begleitungsgallery = require("../models/begleitung");


router.get("/gallerien/neu", begleitungs.renderNewBegleitungsGallery);

router.post(
  "/gallerien",
  upload.array("image"),
  validateBegleitungsGallery,
  catchAsync(begleitungs.createBegleitungsGallery)
);

router.get("/gallerien/:id", catchAsync(begleitungs.showBegleitungsGallery));

router.get(
  "/gallerien/:id/edit",
  isLoggedIn,
  catchAsync(begleitungs.renderEditBegleitungsGallery)
);

  router.put(
  "/gallerien/:id",
  isLoggedIn,
  upload.array("image"),
  validateBegleitungsGallery,
  catchAsync(begleitungs.updateBegleitungsGallery)
);

router.delete("/gallerien/:id", catchAsync(begleitungs.deleteBegleitungsGallery));


module.exports = router;
