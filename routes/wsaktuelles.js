const express = require("express");
const router = express.Router();
const wsnews = require("../controllers/wsaktuelles");
const catchAsync = require("../utils/catchAsync");
const { wsnewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateWsnew } = require("../middleware");

const Wsnew = require("../models/wsaktuell");

router.get("/neu", isLoggedIn, wsnews.renderWsnews);

router.post("/", isLoggedIn, validateWsnew, catchAsync(wsnews.createWsnews));

router.get("/:id/edit", isLoggedIn, catchAsync(wsnews.renderEditWsnews));

router.put("/:id", isLoggedIn, validateWsnew, catchAsync(wsnews.updateWsnews));

module.exports = router;
