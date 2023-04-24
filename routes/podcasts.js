const express = require("express");
const router = express.Router();
const podcasts = require("../controllers/podcasts");
const catchAsync = require("../utils/catchAsync");
const { podcastTextSchema, podcastAccordionSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validatePodcasttext, validatePodcastAccordion } = require("../middleware");

const Podcasttext = require("../models/podcasttext");
const Podcastaccordion = require("../models/podcastaccordion");

router.get("/neu", isLoggedIn, podcasts.renderNewPodcastText);

router.get("/akkordion/neu", isLoggedIn, podcasts.renderNewPodcastAccordion);

router.post(
    "/",
    isLoggedIn,
    validatePodcasttext,
    catchAsync(podcasts.createPodcastText)
  );

  router.post(
    "/akkordion",
    isLoggedIn,
    validatePodcastAccordion,
    catchAsync(podcasts.createPodcastAccordion)
  );

  router.get("/:id/edit", isLoggedIn, catchAsync(podcasts.renderEditPodcastText));

  router.get("/akkordion/:id/edit", isLoggedIn, catchAsync(podcasts.renderEditPodcastAccordion));

  router.put(
    "/:id",
    isLoggedIn,
    validatePodcasttext,
    catchAsync(podcasts.updatePodcastText)
  );

  router.put(
    "/akkordion/:id",
    isLoggedIn,
    validatePodcastAccordion,
    catchAsync(podcasts.updatePodcastAccordion)
  );

  router.get("/akkordion/:id", catchAsync(podcasts.showPodcastAccordion));

  router.delete("/akkordion/:id", catchAsync(podcasts.deletePodcastAccordion));
  


module.exports = router;
