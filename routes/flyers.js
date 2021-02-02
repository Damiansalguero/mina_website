const express = require("express");
const router = express.Router();
const flyers = require("../controllers/flyers");
const catchAsync = require("../utils/catchAsync");
const { flyerSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Flyer = require("../models/flyer");

router.get("/new", flyers.renderFlyerform);

router.get("/:id", catchAsync(flyers.showFlyer));

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateFlyer,
  catchAsync(flyers.createFlyer)
);

router.get("/:id/edit", isLoggedIn, catchAsync(flyers.renderEditFlyer));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateFlyer,
  catchAsync(flyers.updateFlyer)
);

router.delete("/:id", catchAsync(flyers.deleteFlyer));

module.exports = router;
