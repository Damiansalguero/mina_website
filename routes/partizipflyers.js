const express = require("express");
const router = express.Router();
const partflyers = require("../controllers/partizipflyers");
const catchAsync = require("../utils/catchAsync");
const { partFlyerSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validatePartFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Partflyer = require("../models/partizipflyer");

router.get("/neu", partflyers.renderNewPartFlyer);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validatePartFlyer,
  catchAsync(partflyers.createPartFlyer)
);

router.get("/:id", catchAsync(partflyers.showPartFlyer));

router.get("/:id/edit", isLoggedIn, catchAsync(partflyers.editPartFlyer));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validatePartFlyer,
  catchAsync(partflyers.updatePartFlyer)
);

router.delete("/:id", catchAsync(partflyers.deletePartFlyer));

module.exports = router;
