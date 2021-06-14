const Joi = require("joi");
module.exports.dataSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  //needs to be included in order to work on the form
  deleteImages: Joi.array(),
});

module.exports.aktuellesSchema = Joi.object({
  aktuell: Joi.object({
    title: Joi.string().required(),
    link: Joi.string().optional().allow(""),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.calendarSchema = Joi.object({
  calendar: Joi.object({
    title: Joi.string().required(),
    date: Joi.string().required(),
    datetwo: Joi.string().optional().allow(""),
    link: Joi.string().optional().allow(""),
    description: Joi.string().required(),
  }).required(),
});

module.exports.workshopSchema = Joi.object({
  workshop: Joi.object({
    date: Joi.string().required(),
    title: Joi.string().required(),
    location: Joi.string(),
    type: Joi.string().optional(),
    capacity: Joi.string().optional(),
    description: Joi.string().required(),
  }).required(),
});

module.exports.workshopGallerySchema = Joi.object({
  wsg: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(""),
  }).required(),
  deleteImages: Joi.array(),
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
    newsletter: Joi.string().optional(),
  }).required(),
});

module.exports.timelineSchema = Joi.object({
  timeline: Joi.object({
    bewerbung: Joi.string().required(),
    kennenlern: Joi.string().required(),
    bedarf: Joi.string().required(),
    standpunkt: Joi.string().required(),
    vernetzeins: Joi.string().required(),
    idee: Joi.string().required(),
    vernetzzwei: Joi.string().required(),
    konzipierung: Joi.string().required(),
    massnahme: Joi.string().required(),
    evaluation: Joi.string().required(),
    vernetzdrei: Joi.string().required(),
    ergebnis: Joi.string().required(),
  }).required(),
});

module.exports.processGallerySchema = Joi.object({
  przg: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(""),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.landingFlyerSchema = Joi.object({
  flyer: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.aboutSchema = Joi.object({
  about: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    secondtitle: Joi.string().required(),
    seconddescription: Joi.string().required(),
  }).required(),
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
    accordiontexthree: Joi.string(),
  }).required(),
});

module.exports.partizipSchema = Joi.object({
  partizip: Joi.object({
    titleone: Joi.string().required(),
    descriptionone: Joi.string().required(),
    titletwo: Joi.string().optional().allow(""),
    descriptiontwo: Joi.string().optional().allow(""),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.partFlyerSchema = Joi.object({
  partflyer: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.partizipGallerySchema = Joi.object({
  ptg: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.bibSchema = Joi.object({
  bib: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(""),
    autor: Joi.string().optional().allow(""),
    pub: Joi.string().optional().allow(""),
    year: Joi.string().optional().allow(""),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.testdataSchema = Joi.object({
  test: Joi.object({
    title: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});
