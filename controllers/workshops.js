const Workshop = require("../models/post");
const { workshopSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  res.render("wsposts/index");
};

module.exports.renderNewWorkshop = (req, res) => {
  res.render("wsposts/new");
};
