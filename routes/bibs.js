const express = require("express");
const router = express.Router();
const bibs = require("../controllers/bibs");
const catchAsync = require("../utils/catchAsync");
const { bibSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateBib } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Bib = require("../models/bib");

router.get("/neu", isLoggedIn, bibs.renderNewBib);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateBib,
  catchAsync(bibs.createBib)
);

router.get("/:id", catchAsync(bibs.showBib));

router.get("/:id/edit", isLoggedIn, catchAsync(bibs.renderEditBib));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateBib,
  catchAsync(bibs.updateBib)
);

router.delete("/:id", catchAsync(bibs.deleteBib));

module.exports = router;
