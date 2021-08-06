const express = require("express");
const router = express.Router();
const abouts = require("../controllers/abouts");
const catchAsync = require("../utils/catchAsync");
const { aboutSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateAbouts } = require("../middleware");

const About = require("../models/about");

router.get("/neu", isLoggedIn, abouts.renderNewAbout);

router.post("/", isLoggedIn, validateAbouts, catchAsync(abouts.createAbout));

router.get("/:id/edit", isLoggedIn, catchAsync(abouts.renderEditAbout));

router.put("/:id", isLoggedIn, validateAbouts, catchAsync(abouts.updateAbout));

module.exports = router;
