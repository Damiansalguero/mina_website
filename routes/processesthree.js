const express = require("express");
const router = express.Router();
const processesthree = require("../controllers/processesthree");
const processthreegalleries = require("../controllers/processthreegalleries");
const processthreeflyers = require("../controllers/processthreeflyers");
const catchAsync = require("../utils/catchAsync");
const { processThreeGallerySchema, processThreeSchema, processThreeFlyerSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateProcessThreeGallery, validateProzessThree, validateProzessThreeFlyer } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });


router.get("/neu", isLoggedIn, processesthree.renderProcessThreeNew);

router.get("/galerien/neu", processthreegalleries.renderNewProcessGallery);

router.get("/flyer/neu", processthreeflyers.renderNewProzessThreeFlyer);

router.post(
    "/",
    isLoggedIn,
    upload.array("image"),
    validateProzessThree,
    catchAsync(processesthree.createProzessThree)
  );

router.post(
    "/galerien",
    upload.array("image"),
    validateProcessThreeGallery,
    catchAsync(processthreegalleries.createProcessThreeGallery)
  );

router.post(
    "/flyer",
    upload.array("image"),
    validateProzessThreeFlyer,
    catchAsync(processthreeflyers.createProzessThreeFlyer)
  );

router.get("/galerien/:id", catchAsync(processthreegalleries.showProcessThreeGallery));

router.get("/flyer/:id", catchAsync(processthreeflyers.showProzessThreeFlyer));

router.get("/:id/edit", isLoggedIn, catchAsync(processesthree.renderEditProzessThree));

router.get(
    "/galerien/:id/edit",
    isLoggedIn,
    catchAsync(processthreegalleries.renderEditProcessThreeGallery)
  );
  router.get(
    "/flyer/:id/edit",
    isLoggedIn,
    catchAsync(processthreeflyers.renderEditProzessThreeFlyer)
  );

router.put(
    "/:id",
    isLoggedIn,
    upload.array("image"),
    validateProzessThree,
    catchAsync(processesthree.updateProzessThree)
  );

router.put(
    "/galerien/:id",
    isLoggedIn,
    upload.array("image"),
    validateProcessThreeGallery,
    catchAsync(processthreegalleries.updateProcessThreeGallery)
  );

router.put(
    "/flyer/:id",
    isLoggedIn,
    upload.array("image"),
    validateProzessThreeFlyer,
    catchAsync(processthreeflyers.updateProzessThreeFlyer)
  );

router.delete("/galerien/:id", catchAsync(processthreegalleries.deleteProcessThreeGallery));

router.delete("/flyer/:id", catchAsync(processthreeflyers.deleteProzessThreeFlyer));

module.exports = router;
