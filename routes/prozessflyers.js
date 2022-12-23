const express = require("express");
const router = express.Router();
const prozessflyers = require("../controllers/prozessflyers");
const catchAsync = require("../utils/catchAsync");
const { prozessFlyerSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateProzessFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Prozessflyer = require("../models/prozessflyer");

router.get("/neu", prozessflyers.renderNewProzessFlyer);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateProzessFlyer,
  catchAsync(prozessflyers.createProzessFlyer)
);

router.get("/:id", catchAsync(prozessflyers.showProzessFlyer));

router.get("/:id/edit", isLoggedIn, catchAsync(prozessflyers.editProzessFlyer));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validateProzessFlyer,
  catchAsync(prozessflyers.updateProzessFlyer)
);

router.delete("/:id", catchAsync(prozessflyers.deleteProzessFlyer));

module.exports = router;
