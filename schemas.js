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
    type: Joi.string().optional(),
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

module.exports.workshopregisterSchema = Joi.object({
  wsr: Joi.object({
    location: Joi.string().required(),
    date: Joi.string().required(),
    name: Joi.string().required(),
    organisation: Joi.string().required(),
    membership: Joi.array().required(),
    street: Joi.string().required(),
    zip: Joi.string().required(),
    phone: Joi.string().required(),
    assistance: Joi.array().required(),
    assistanceneed: Joi.string().required(),
    aid: Joi.array().required(),
    aids: Joi.string().required(),
    care: Joi.array().required(),
    caretaker: Joi.array().required(),
    volunteer: Joi.array().required(),
    allergy: Joi.array(),
    allergies: Joi.string(),
    dietwish: Joi.string(),
    orgafield: Joi.array().required(),
    description: Joi.string().required(),
    wishes: Joi.string().required(),
    personal: Joi.array().required(),
    newsletter: Joi.string().optional()
  }).required()
});

module.exports.timelineSchema = Joi.object({
  timeline: Joi.object({
    title: Joi.string().required(),
    date: Joi.string().required(),
    phase: Joi.string().required(),
    description: Joi.string().required()
  }).required()
});

module.exports.flyerSchema = Joi.object({
  flyer: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});

module.exports.testdataSchema = Joi.object({
  test: Joi.object({
    title: Joi.string().required(),
    date: Joi.array().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});
