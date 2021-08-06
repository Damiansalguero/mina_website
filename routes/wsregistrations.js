const express = require("express");
const router = express.Router();
const wsregisters = require("../controllers/wsregistrations");
const catchAsync = require("../utils/catchAsync");
const { workshopregisterSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateWsRegister } = require("../middleware");
const Anmeldung = require("../models/wsregistration");

router.get("/:id/new", wsregisters.renderAnmeldung);

router.post("/:id/new", catchAsync(wsregisters.createAnmeldung));

module.exports = router;
