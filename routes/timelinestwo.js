const express = require("express");
const router = express.Router();
const timelinestwo = require("../controllers/timelinestwo");
const catchAsync = require("../utils/catchAsync");
const { timelinetwoSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateTimelinetwo } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/neu", timelinestwo.renderNewTimelinetwo);

router.post("/", validateTimelinetwo, catchAsync(timelinestwo.createTimelinetwo));

router.get("/:id", catchAsync(timelinestwo.showTimelinetwo));

router.get("/:id/edit", isLoggedIn, catchAsync(timelinestwo.renderEditTimelinetwo));

router.put(
  "/:id",
  isLoggedIn,
  validateTimelinetwo,
  catchAsync(timelinestwo.updateTimelinetwo)
);

router.delete("/:id", catchAsync(timelinestwo.deleteTimelinetwo));

module.exports = router;
