const express = require("express");
const router = express.Router();
const processes = require("../controllers/processes");
const catchAsync = require("../utils/catchAsync");
const { processGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateProcessGallery } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Processgallery = require("../models/process");

router.get("/gallerien/neu", processes.renderNewProcessGallery);

router.post(
  "/gallerien",
  upload.array("image"),
  validateProcessGallery,
  catchAsync(processes.createProzessGallery)
);

router.get("/gallerien/:id", catchAsync(processes.showProcessGallery));

router.get(
  "/gallerien/:id/edit",
  isLoggedIn,
  catchAsync(processes.renderEditProcessGallery)
);

router.put(
  "/gallerien/:id",
  isLoggedIn,
  upload.array("image"),
  validateProcessGallery,
  catchAsync(processes.updateProcessGallery)
);

router.delete("/gallerien/:id", catchAsync(processes.deleteWorkshopGallery));

module.exports = router;
