const express = require("express");
const router = express.Router();
const processes = require("../controllers/processes");
const catchAsync = require("../utils/catchAsync");
const { processGallerySchema, prozessSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateProcessGallery, validateProzess } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Prozess = require("../models/prozess");
const Processgallery = require("../models/process");

router.get("/neu", isLoggedIn, processes.renderProcessNew);

router.get("/gallerien/neu", processes.renderNewProcessGallery);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateProzess,
  catchAsync(processes.createProzess)
);

router.post(
  "/gallerien",
  upload.array("image"),
  validateProcessGallery,
  catchAsync(processes.createProzessGallery)
);

router.get("/gallerien/:id", catchAsync(processes.showProcessGallery));

router.get("/:id/edit", isLoggedIn, catchAsync(processes.renderEditProzess));

router.get(
  "/gallerien/:id/edit",
  isLoggedIn,
  catchAsync(processes.renderEditProcessGallery)
);

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateProzess,
  catchAsync(processes.updateProzess)
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
