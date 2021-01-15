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
