const express = require("express");
const router = express.Router();
const tests = require("../controllers/tests");
const catchAsync = require("../utils/catchAsync");
const { dataSchema, testdataSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");

const {
  isLoggedIn,
  validateData,
  isAuthor,
  validatetestData
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Test = require("../models/test");

router.get("/", catchAsync(tests.renderTest));

router.get("/testaktuell", catchAsync(tests.showTest));

router.get("/form", tests.renderTestform);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validatetestData,
  catchAsync(tests.createTest)
);

module.exports = router;
