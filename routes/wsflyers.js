const express = require("express");
const router = express.Router();
const wsflyers = require("../controllers/wsflyers");
const catchAsync = require("../utils/catchAsync");
const { workshopFlyerSchema} = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateWorkshopFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });


router.get("/neu", isLoggedIn, wsflyers.renderNewWorkshopFlyer);

router.post(
    "/",
    upload.array("image"),
    validateWorkshopFlyer,
    catchAsync(wsflyers.createWorkshopFlyer)
  );

router.get("/:id", catchAsync(wsflyers.showWorkshopFlyer));

router.get(
    "/:id/edit",
    isLoggedIn,
    catchAsync(wsflyers.renderEditWorkshopFlyer)
  );

router.put(
    "/:id",
    isLoggedIn,
    upload.array("image"),
    validateWorkshopFlyer,
    catchAsync(wsflyers.updateWorkshopFlyer)
  );

router.delete("/:id", catchAsync(wsflyers.deleteWorkshopFlyer));

module.exports = router;
