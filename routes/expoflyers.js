const express = require("express");
const router = express.Router();
const expoflyers = require("../controllers/expoflyers");
const catchAsync = require("../utils/catchAsync");
const { expoFlyerSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateExpoFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Expoflyer = require("../models/expoflyer");

router.get("/neu", expoflyers.renderNewExpoFlyer);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateExpoFlyer,
  catchAsync(expoflyers.createExpoFlyer)
);

router.get("/:id", catchAsync(expoflyers.showExpoFlyer));

router.get("/:id/edit", isLoggedIn, catchAsync(expoflyers.editExpoFlyer));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateExpoFlyer,
  catchAsync(expoflyers.updateExpoFlyer)
);

router.delete("/:id", catchAsync(expoflyers.deleteExpoFlyer));

module.exports = router;
