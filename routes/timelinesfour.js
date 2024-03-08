const express = require ("express");
const router = express.Router();
const timelinesfour = require ("../controllers/timelinesfour");
const catchAsync = require("../utils/catchAsync");
const { timelinefourSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateTimelinefour } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/neu", timelinesfour.renderNewTimelinefour);

router.post("/", validateTimelinefour, catchAsync(timelinesfour.createTimelinefour));

router.get("/:id/edit", isLoggedIn, catchAsync(timelinesfour.renderEditTimelinefour));

router.put(
    "/:id",
    isLoggedIn,
    validateTimelinefour,
    catchAsync(timelinesfour.updateTimelinefour)
  );

router.delete("/:id", catchAsync(timelinesfour.deleteTimelinefour));

module.exports = router;
