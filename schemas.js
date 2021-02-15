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
    membership: Joi.array().optional(),
    street: Joi.string().required(),
    zip: Joi.string().required(),
    phone: Joi.string().required(),
    assistance: Joi.array().optional(),
    assistanceneed: Joi.string(),
    aid: Joi.array().optional(),
    aids: Joi.string(),
    care: Joi.array().optional(),
    caretaker: Joi.array().optional(),
    volunteer: Joi.array().optional(),
    allergy: Joi.array(),
    allergies: Joi.string(),
    dietwish: Joi.string(),
    orgafield: Joi.array().required(),
    description: Joi.string(),
    wishes: Joi.string(),
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

module.exports.aboutSchema = Joi.object({
  about: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    secondtitle: Joi.string().required(),
    seconddescription: Joi.string().required()
  }).required()
});

module.exports.wsnewSchema = Joi.object({
  wsnew: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    accordiontitleone: Joi.string(),
    accordiontexone: Joi.string(),
    accordiontitletwo: Joi.string(),
    accordiontextwo: Joi.string(),
    accordiontitlethree: Joi.string(),
    accordiontexthree: Joi.string()
  }).required()
});

module.exports.testdataSchema = Joi.object({
  test: Joi.object({
    title: Joi.string().required(),
    date: Joi.array().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});
