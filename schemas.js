const Joi = require("joi");
module.exports.dataSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  //needs to be included in order to work on the form
  deleteImages: Joi.array()
});

module.exports.aktuellesSchema = Joi.object({
  aktuell: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});

module.exports.calendarSchema = Joi.object({
  calendar: Joi.object({
    title: Joi.string().required(),
    date: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    description: Joi.string().required()
  }).required()
});

module.exports.workshopSchema = Joi.object({
  workshop: Joi.object({
    date: Joi.string().required(),
    title: Joi.string().required(),
    location: Joi.string().required(),
    capacity: Joi.string().optional(),
    description: Joi.string().required()
  }).required()
});

module.exports.workshopGallerySchema = Joi.object({
  wsg: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});

module.exports.timelineSchema = Joi.object({
  timeline: Joi.object({
    title: Joi.string().required(),
    date: Joi.string().required(),
    phase: Joi.string().required(),
    description: Joi.string().required()
  }).required()
});

module.exports.testdataSchema = Joi.object({
  test: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});
