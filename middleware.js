const {
  aktuellesSchema,
  calendarSchema,
  workshopSchema,
  workshopGallerySchema,
  wsnewSchema,
  partizipSchema,
  timelineSchema,
  flyerSchema,
  aboutSchema,
  testdataSchema,
  dataSchema
} = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");

//isAuthenticated() is a passport method
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Du musst eingeloggt sein, um diese Seite zu sehen");
    return res.redirect("/login");
  }
  next();
};

//////////////// VALIDATION MIDDLEWARE ///////////////////
module.exports.validateData = (req, res, next) => {
  const { error } = dataSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
//////////////// AKTUELLES POSTS ///////////////////
module.exports.validateAktuelles = (req, res, next) => {
  const { error } = aktuellesSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//////////////// CALENDAR POSTS ///////////////////
module.exports.validateCalendar = (req, res, next) => {
  console.log(req.body);
  const { error } = calendarSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//////////////// WORKSHOPS /////////////
module.exports.validateWorkshops = (req, res, next) => {
  const { error } = workshopSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// WORKSHOP GALLERY /////////////
module.exports.validateWorkshopGallery = (req, res, next) => {
  const { error } = workshopGallerySchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// TIMELINE /////////////
module.exports.validateTimeline = (req, res, next) => {
  const { error } = timelineSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// Flyer /////////////
module.exports.validateFlyer = (req, res, next) => {
  const { error } = flyerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// Anmeldung /////////////
module.exports.validateWsRegister = (req, res, next) => {
  const { error } = workshopregisterSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// About /////////////
module.exports.validateAbouts = (req, res, next) => {
  const { error } = aboutSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// Wsnew /////////////
module.exports.validateWsnew = (req, res, next) => {
  const { error } = wsnewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/////////////// Partizip /////////////
module.exports.validatePartizip = (req, res, next) => {
  const { error } = partizipSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//////////////// TEST /////////////
module.exports.validatetestData = (req, res, next) => {
  const { error } = testdataSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
//////////////// VALIDATION AUTHOR //////////////////
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

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
