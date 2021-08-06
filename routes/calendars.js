const express = require("express");
const router = express.Router();
const calendars = require("../controllers/calendars");
const catchAsync = require("../utils/catchAsync");
const { calendarSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateCalendar } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Calendar = require("../models/calendar");

router.get("/alle", catchAsync(calendars.index));

router.get("/neu", isLoggedIn, calendars.renderNewCalendar);

router.post(
  "/",
  isLoggedIn,
  validateCalendar,
  catchAsync(calendars.createCalendar)
);

router.get("/:id", catchAsync(calendars.showCalendar));

router.get("/:id/edit", isLoggedIn, catchAsync(calendars.renderEditCalendar));

router.put(
  "/:id",
  isLoggedIn,
  validateCalendar,
  catchAsync(calendars.updateCalendar)
);

router.delete("/:id", catchAsync(calendars.deleteCalendar));
module.exports = router;
