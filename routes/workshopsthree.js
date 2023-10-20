const express = require("express");
const router = express.Router();
const wsthreetexts = require("../controllers/workshopsthree");
const catchAsync = require("../utils/catchAsync");
const { workshopThreeTextSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateWorkshopThreeText } = require("../middleware");

const Workshopthreetext = require("../models/workshopthreetext");

router.get("/neu", isLoggedIn, wsthreetexts.renderNewWorkshopThreeText);

router.post(
  "/",
  isLoggedIn,
  validateWorkshopThreeText,
  catchAsync(wsthreetexts.createWorkshopThreeText)
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(wsthreetexts.renderEditWorkshopThreeText)
);

router.put(
    "/:id",
    isLoggedIn,
    validateWorkshopThreeText,
    catchAsync(wsthreetexts.updateWorkshopThreeText)
  );

module.exports = router;
