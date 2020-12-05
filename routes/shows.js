const express = require("express");
const router = express.Router();
const shows = require("../controllers/shows");

router.get("/", shows.renderLanding);

module.exports = router;
