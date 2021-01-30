const express = require("express");
const router = express.Router();
const timelines = require("../controllers/timelines");
const catchAsync = require("../utils/catchAsync");
const { timelineSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateTimeline } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/neu", timelines.renderNewTimeline);

router.post("/", validateTimeline, catchAsync(timelines.createTimenline));

router.get("/:id", catchAsync(timelines.showTimeline));

router.get("/:id/edit", isLoggedIn, catchAsync(timelines.renderEditTimeline));

router.put(
  "/:id",
  isLoggedIn,
  validateTimeline,
  catchAsync(timelines.updateTimeline)
);

router.delete("/:id", catchAsync(timelines.deleteTimeline));

module.exports = router;
