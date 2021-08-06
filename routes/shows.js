const express = require("express");
const router = express.Router();
const shows = require("../controllers/shows");

const catchAsync = require("../utils/catchAsync");

router.get("/", shows.renderLanding);
router.get("/home", shows.renderhome);
router.get("/workshops", shows.renderWorkshops);
router.get("/partizipatives-projekt", shows.renderPartizip);
router.get("/prozess-begleitung", shows.renderProzess);
router.get("/dokumentation", shows.renderDoku);
router.get("/dokumentation/praxisseminare-2019", shows.renderZweiNeunzehn);
router.get("/dokumentation/Fachtagung", shows.renderFach);
router.get("/impressum", shows.renderImpressum);
router.get("/datenschutz-erklaerung", shows.renderDatenschutz);
router.get("/online-bibliothek", shows.renderBib);
router.get("/kontakt", shows.renderKontakt);
router.post("/kontakt", catchAsync(shows.createKontakt));

module.exports = router;
