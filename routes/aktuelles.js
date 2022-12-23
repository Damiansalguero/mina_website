const express = require("express");
const router = express.Router();
const aktuelles = require("../controllers/aktuelles");
const catchAsync = require("../utils/catchAsync");
const { aktuellesSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateAktuelles } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Aktuell = require("../models/aktuell");

router.get("/neu", isLoggedIn, aktuelles.renderNewAktuelles);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateAktuelles,
  catchAsync(aktuelles.createAktuelles)
);

router.get("/:id", catchAsync(aktuelles.showAktuelles));

router.get("/:id/edit", isLoggedIn, catchAsync(aktuelles.renderEditAktuelles));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateAktuelles,
  catchAsync(aktuelles.updateAktuelles)
);

module.exports = router;
