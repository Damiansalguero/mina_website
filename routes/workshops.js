const express = require("express");
const router = express.Router();
const workshops = require("../controllers/workshops");
const catchAsync = require("../utils/catchAsync");
const { workshopSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateWorkshops } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Workshop = require("../models/workshop");

router.get("/", catchAsync(workshops.index));

router.get("/new", workshops.renderNewWorkshop);

router.post(
  "/",

  validateWorkshops,
  catchAsync(workshops.createWorkshop)
);

router.get("/:id", catchAsync(workshops.showWorkshop));

module.exports = router;
