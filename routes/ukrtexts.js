const express = require("express");
const router = express.Router();
const ukrtexts = require("../controllers/ukrtexts");
const catchAsync = require("../utils/catchAsync");
const { ukrTextSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateUkrtext } = require("../middleware");

const Ukrtext = require("../models/ukrtext");

router.get("/neu", isLoggedIn, ukrtexts.renderNewUkrtext);

router.post(
    "/",
    isLoggedIn,
    validateUkrtext,
    catchAsync(ukrtexts.createUkrtext)
  );

router.get("/:id/edit", isLoggedIn, catchAsync(ukrtexts.renderEditUkrtext));

router.put(
    "/:id",
    isLoggedIn,
    validateUkrtext,
    catchAsync(ukrtexts.updateUkrtext)
  );


module.exports = router;
