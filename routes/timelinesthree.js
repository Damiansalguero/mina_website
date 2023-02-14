const express = require ("express");
const router = express.Router();
const timelinesthree = require ("../controllers/timelinesthree");
const catchAsync = require("../utils/catchAsync");
const { timelinethreeSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateTimelinethree } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/neu", timelinesthree.renderNewTimelinethree);

router.post("/", validateTimelinethree, catchAsync(timelinesthree.createTimelinethree));

router.get("/:id/edit", isLoggedIn, catchAsync(timelinesthree.renderEditTimelinethree));

router.put(
    "/:id",
    isLoggedIn,
    validateTimelinethree,
    catchAsync(timelinesthree.updateTimelinethree)
  );

router.delete("/:id", catchAsync(timelinesthree.deleteTimelinethree));

module.exports = router;
