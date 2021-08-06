const express = require("express");
const router = express.Router();
const workshops = require("../controllers/workshops");
const catchAsync = require("../utils/catchAsync");
const { workshopSchema, workshopGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const {
  isLoggedIn,
  validateWorkshops,
  validateWorkshopGallery,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Workshop = require("../models/workshop");
const Workshopgallery = require("../models/workshopgallery");

router.get("/", catchAsync(workshops.index));

router.get("/gallerien", catchAsync(workshops.wsgallerien));

router.get("/new", workshops.renderNewWorkshop);

router.get("/gallerien/neu", workshops.renderNewWorkshopGallery);

router.post(
  "/",

  validateWorkshops,
  catchAsync(workshops.createWorkshop)
);

router.post(
  "/gallerien",
  upload.array("image"),
  validateWorkshopGallery,
  catchAsync(workshops.createWorkshopGallery)
);

router.get("/:id", catchAsync(workshops.showWorkshop));

router.get("/gallerien/:id", catchAsync(workshops.showWorkshopGallery));

router.get("/:id/edit", isLoggedIn, catchAsync(workshops.renderEditWorkshop));

router.get(
  "/gallerien/:id/edit",
  isLoggedIn,
  catchAsync(workshops.renderEditWorkshopGallery)
);

router.put(
  "/:id",
  isLoggedIn,
  validateWorkshops,
  catchAsync(workshops.updateWorkshop)
);

router.put(
  "/gallerien/:id",
  isLoggedIn,
  upload.array("image"),
  validateWorkshopGallery,
  catchAsync(workshops.updateWorkshopGallery)
);

router.delete("/:id", catchAsync(workshops.deleteWorkshop));

router.delete("/gallerien/:id", catchAsync(workshops.deleteWorkshopGallery));

module.exports = router;
