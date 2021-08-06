const express = require("express");
const router = express.Router();
const partizips = require("../controllers/partizips");
const catchAsync = require("../utils/catchAsync");
const { partizipSchema, partizipGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const {
  isLoggedIn,
  validatePartizip,
  validatePartizipGallery,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Partizip = require("../models/partizip");
const Partizipgallery = require("../models/partizipgallery");

router.get("/neu", isLoggedIn, partizips.renderPartizipNew);

router.get("/gallerien/neu", isLoggedIn, partizips.renderPartizipNewGallery);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validatePartizip,
  catchAsync(partizips.createPartizip)
);

router.post(
  "/gallerien",
  isLoggedIn,
  upload.array("image"),
  validatePartizipGallery,
  catchAsync(partizips.createPartizipgallery)
);

router.get("/gallerien/:id", catchAsync(partizips.showPartizipGallery));

router.get("/:id/edit", isLoggedIn, catchAsync(partizips.renderEditPartizip));

router.get(
  "/gallerien/:id/edit",
  isLoggedIn,
  catchAsync(partizips.renderEditPartizipgallery)
);

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validatePartizip,
  catchAsync(partizips.updatePartizip)
);

router.put(
  "/gallerien/:id",
  isLoggedIn,
  upload.array("image"),
  validatePartizipGallery,
  catchAsync(partizips.updatePartizipGallery)
);

router.delete("/gallerien/:id", catchAsync(partizips.deletePartizipgallery));

module.exports = router;
