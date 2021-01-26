const express = require("express");
const router = express.Router();
const workshops = require("../controllers/workshops");
const catchAsync = require("../utils/catchAsync");
const { workshopSchema, workshopGallerySchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const {
  isLoggedIn,
  validateWorkshops,
  validateWorkshopGallery
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Workshop = require("../models/workshop");
const Workshopgallery = require("../models/workshopgallery");

router.get("/", catchAsync(workshops.index));

router.get("/new", workshops.renderNewWorkshop);

router.post(
  "/",

  validateWorkshops,
  catchAsync(workshops.createWorkshop)
);

router.get("/:id", catchAsync(workshops.showWorkshop));

router.get("/:id/edit", isLoggedIn, catchAsync(workshops.renderEditWorkshop));

router.put(
  "/:id",
  isLoggedIn,
  validateWorkshops,
  catchAsync(workshops.updateWorkshop)
);

router.delete("/:id", catchAsync(workshops.deleteWorkshop));

module.exports = router;
