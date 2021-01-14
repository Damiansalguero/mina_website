const Joi = require("joi");
//This is not a Mongoose Schema. It validates the data before attemt to save it with mongoose
//Joi takes care of the validation on the server side
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
  aktuelles: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});

module.exports.testdataSchema = Joi.object({
  test: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.string().required(),
    description: Joi.string().required()
  }).required()
});
