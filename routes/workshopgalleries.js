const express = require("express");
const router = express.Router();
const workshopgalleries = require("../controllers/workshopgalleries");
const catchAsync = require("../utils/catchAsync");
const { workshopGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateWorkshopGallery } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Workshopgallery = require("../models/workshopgallery");

router.get("/", catchAsync(workshopgalleries.index));

router.get("/new", workshopgalleries.renderNewWorkshopGallery);

router.get("/:id", catchAsync(workshopgalleries.showWorkshopGallery));

router.post(
  "/",
  upload.array("image"),
  validateWorkshopGallery,
  catchAsync(workshopgalleries.createWorkshopGallery)
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(workshopgalleries.renderEditWorkshopGallery)
);

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateWorkshopGallery,
  catchAsync(workshopgalleries.updateWorkshopGallery)
);

router.delete("/:id", catchAsync(workshopgalleries.deleteWorkshopGallery));

module.exports = router;
