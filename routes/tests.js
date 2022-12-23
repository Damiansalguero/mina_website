const express = require("express");
const router = express.Router();
const tests = require("../controllers/tests");

const catchAsync = require("../utils/catchAsync");
const { testdataSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validatetestData } = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Test = require("../models/test");

router.get("/", catchAsync(tests.index));

router.get("/test", catchAsync(tests.renderTest));

router.get("/new", tests.renderTestform);

router.get("/:id", catchAsync(tests.showTest));

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validatetestData,
  catchAsync(tests.createTest)
);

router.get("/:id/edit", isLoggedIn, catchAsync(tests.renderEditForm));

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  validatetestData,
  catchAsync(tests.updatetest)
);

router.delete("/:id", catchAsync(tests.deletetest));

module.exports = router;
