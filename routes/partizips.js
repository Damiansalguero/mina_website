const express = require("express");
const router = express.Router();
const partizips = require("../controllers/partizips");
const catchAsync = require("../utils/catchAsync");
const { partizipSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validatePartizip } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Partizip = require("../models/partizip");

router.get("/neu", isLoggedIn, partizips.renderPartizipNew);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validatePartizip,
  catchAsync(partizips.createPartizip)
);

router.get("/:id/edit", isLoggedIn, catchAsync(partizips.renderEditPartizip));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validatePartizip,
  catchAsync(partizips.updatePartizip)
);

module.exports = router;
