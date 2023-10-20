const express = require("express");
const router = express.Router();
const expogalleries = require("../controllers/expogalleries");
const catchAsync = require("../utils/catchAsync");
const { expoGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateExpoGallery } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Expogallery = require("../models/expogallery");

router.get("/neu", expogalleries.renderNewExpoGallery);

router.post(
  "/",
  upload.array("image"),
  validateExpoGallery,
  catchAsync(expogalleries.createExpoGallery)
);

router.get("/:id", catchAsync(expogalleries.showExpoGallery));

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(expogalleries.renderEditExpoGallery)
);

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateExpoGallery,
  catchAsync(expogalleries.updateExpoGallery)
);

router.delete("/:id", catchAsync(expogalleries.deleteExpoGallery));


module.exports = router;
