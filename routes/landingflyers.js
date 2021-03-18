const express = require("express");
const router = express.Router();
const landingflyers = require("../controllers/landingflyers");
const catchAsync = require("../utils/catchAsync");
const { flyerSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateLandingFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Flyer = require("../models/landingflyer");

router.get("/neu", landingflyers.renderNewLandingFlyer);

router.get("/:id", catchAsync(landingflyers.showLandingFlyer));

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateLandingFlyer,
  catchAsync(landingflyers.createLandingFlyer)
);

router.get("/:id/edit", isLoggedIn, catchAsync(landingflyers.editLandingFlyer));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateLandingFlyer,
  catchAsync(landingflyers.updateLandingFlyer)
);

router.delete("/:id", catchAsync(landingflyers.deleteLandingFlyer));

module.exports = router;
