const express = require("express");
const router = express.Router();
const partizips = require("../controllers/partizips");
const catchAsync = require("../utils/catchAsync");
const { partizipSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validatePartizip } = require("../middleware");

const Partizip = require("../models/partizip");

router.get("/neu", isLoggedIn, partizips.renderPartizipNew);

router.post(
  "/",
  isLoggedIn,
  validatePartizip,
  catchAsync(partizips.createPartizip)
);

router.get("/:id/edit", isLoggedIn, catchAsync(partizips.renderEditPartizip));

router.put(
  "/:id",
  isLoggedIn,
  validatePartizip,
  catchAsync(partizips.updatePartizip)
);

module.exports = router;
