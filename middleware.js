const {
  aktuellesSchema,
  calendarSchema,
  workshopSchema,
  workshopGallerySchema,
  wsnewSchema,
  workshopFlyerSchema,
  workshopThreeTextSchema,
  partizipSchema,
  partizipGallerySchema,
  partFlyerSchema,
  expoTextSchema,
  expoFlyerSchema,
  expoGallerySchema,
  podcastTextSchema,
  podcastAccordionSchema,
  timelineSchema,
  timelinetwoSchema,
  timelinethreeSchema,
  prozessTextSchema,
  processGallerySchema,
  processThreeSchema,
  processThreeGallerySchema,
  processThreeFlyerSchema,
  begleitungsGallerySchema,
  landingFlyerSchema,
  aboutSchema,
  ukrTextSchema,
  bibSchema,
  testdataSchema,
  dataSchema,
  workshopregisterSchema,
  prozessFlyerSchema
} = require("./schemas.js");

const ExpressError = require("./utils/ExpressError");

//! isAuthenticated() is a passport method//
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Du musst eingeloggt sein, um diese Seite zu sehen");
    return res.redirect("/login");
  }
  next();
};

//* VALIDATION MIDDLEWARE //
module.exports.validateData = (req, res, next) => {
  const { error } = dataSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
//*AKTUELLES POSTS //
module.exports.validateAktuelles = (req, res, next) => {
  const { error } = aktuellesSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* CALENDAR POSTS //
module.exports.validateCalendar = (req, res, next) => {
  console.log(req.body);
  const { error } = calendarSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* WORKSHOPS //
module.exports.validateWorkshops = (req, res, next) => {
  const { error } = workshopSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* WORKSHOP GALLERY //
module.exports.validateWorkshopGallery = (req, res, next) => {
  const { error } = workshopGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* WORKSHOP FLYER //
module.exports.validateWorkshopFlyer = (req, res, next) => {
  const { error } = workshopFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Workshop Three Text // 
module.exports.validateWorkshopThreeText = (req, res, next) => {
  const { error } = workshopThreeTextSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* TIMELINE //
module.exports.validateTimeline = (req, res, next) => {
  const { error } = timelineSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* TIMELINE //
module.exports.validateTimelinetwo = (req, res, next) => {
  const { error } = timelinetwoSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* TIMELINETHREE //
module.exports.validateTimelinethree = (req, res, next) => {
  const { error } = timelinethreeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Flyer //
module.exports.validateLandingFlyer = (req, res, next) => {
  const { error } = landingFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Anmeldung //
module.exports.validateWsRegister = (req, res, next) => {
  const { error } = workshopregisterSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* About //
module.exports.validateAbouts = (req, res, next) => {
  const { error } = aboutSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Wsnew //
module.exports.validateWsnew = (req, res, next) => {
  const { error } = wsnewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Partizip //
module.exports.validatePartizip = (req, res, next) => {
  const { error } = partizipSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Partizip //
module.exports.validatePartizipGallery = (req, res, next) => {
  const { error } = partizipGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Partizip Flyer //
module.exports.validatePartFlyer = (req, res, next) => {
  const { error } = partFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Expo Flyer //
module.exports.validateExpoFlyer = (req, res, next) => {
  const { error } = expoFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Bib //
module.exports.validateBib = (req, res, next) => {
  const { error } = bibSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }expoTextSchema
};

//* Prozess Gallerie //
module.exports.validateBegleitungsGallery = (req, res, next) => {
  const { error } = begleitungsGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Prozess Gallerie //
module.exports.validateProcessGallery = (req, res, next) => {
  const { error } = processGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Prozess Text //
module.exports.validateProzess = (req, res, next) => {
  const { error } = prozessTextSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Prozess Flyer //
module.exports.validateProzessFlyer = (req, res, next) => {
  const { error } = prozessFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* ProcessThreeText // 
module.exports.validateProzessThree = (req, res, next) => {
  const { error } = processThreeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* ProcessThreeGallery // 
module.exports.validateProcessThreeGallery = (req, res, next) => {
  const { error } = processThreeGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* ProcessThreeFlyer // 
module.exports.validateProzessThreeFlyer = (req, res, next) => {
  const { error } = processThreeFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Expo Text //
module.exports.validateExpotext = (req, res, next) => {
  const { error } = expoTextSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Expo Flyer //
module.exports.validateExpoFlyer = (req, res, next) => {
  const { error } = expoFlyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Expo Gallerie //
module.exports.validateExpoGallery = (req, res, next) => {
  const { error } = expoGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Podcast Text //
module.exports.validatePodcasttext = (req, res, next) => {
  const { error } = podcastTextSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Podcast Accordion //
module.exports.validatePodcastAccordion = (req, res, next) => {
  const { error } = podcastAccordionSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* Ukraine Text //
module.exports.validateUkrtext = (req, res, next) => {
  const { error } = ukrTextSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//* TEST ///
module.exports.validatetestData = (req, res, next) => {
  const { error } = testdataSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
//////////////// VALIDATION AUTHOR //////////////////
// module.exports.isAuthor = async (req, res, next) => {
//   const { id } = req.params;
//   const post = await Post.findById(id);
//   if (!post.author.equals(req.user._id)) {
//     req.flash("error", "You do not have permission to do that");
//     return res.redirect(`/campgrounds/${id}`);
//   }
//   next();
// };

//////////////// VALIDATION MIDDLEWARE //////////////////
// module.exports.validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map(el => el.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

//////////////// VALIDATION REVIEW AUTHOR //////////////////
// module.exports.isReviewAuthor = async (req, res, next) => {
//   //reviewId comes from routes/revies.js
//   const { id, reviewId } = req.params;
//   const review = await Review.findById(reviewId);
//   if (!review.author.equals(req.user._id)) {
//     req.flash("error", "You do not have permission to do that");
//     return res.redirect(`/campgrounds/${id}`);
//   }
//   next();
// };
