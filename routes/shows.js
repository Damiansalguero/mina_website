const express = require("express");
const router = express.Router();
const shows = require("../controllers/shows");

router.get("/", shows.renderLanding);
router.get("/workshops", shows.renderWorkshops);
router.get("/partizipatives-projekt", shows.renderPartizip);
router.get("/prozess-begleitung", shows.renderProzess);
router.get("/dokumentation", shows.renderDoku);
router.get("/dokumentation/praxisseminare-2019", shows.renderZweiNeunzehn);
router.get("/kontakt", shows.renderKontakt);
router.get("/dokumentation/Fachtagung", shows.renderFach);

module.exports = router;
