const express = require("express");
const router = express.Router();
const expotexts = require("../controllers/expotexts");
const catchAsync = require("../utils/catchAsync");
const { expoTextSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateExpotext } = require("../middleware");

const Expotext = require("../models/expotext");

router.get("/neu", isLoggedIn, expotexts.renderNewExpotext);

router.post(
  "/",
  isLoggedIn,
  validateExpotext,
  catchAsync(expotexts.createExpotext)
);

router.get("/:id/edit", isLoggedIn, catchAsync(expotexts.renderEditExpotext));

router.put(
  "/:id",
  isLoggedIn,
  validateExpotext,
  catchAsync(expotexts.updateExpotext)
);

module.exports = router;
