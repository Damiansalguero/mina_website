const Post = require("../models/post");
const { dataSchema } = require("../schemas.js");

module.exports.renderLanding = async (req, res) => {
  const posts = await Post.find({});
  res.render("landing", { posts });
};

module.exports.renderWorkshops = (req, res) => {
  res.render("workshops");
};

module.exports.renderPartizip = (req, res) => {
  res.render("partizip");
};
module.exports.renderProzess = (req, res) => {
  res.render("prozess");
};
module.exports.renderDoku = (req, res) => {
  res.render("dokumentation");
};
module.exports.renderZweiNeunzehn = (req, res) => {
  res.render("praxisseminar");
};

module.exports.renderFach = (req, res) => {
  res.render("fach");
};

module.exports.renderImpressum = (req, res) => {
  res.render("impressum");
};

module.exports.renderDatenschutz = (req, res) => {
  res.render("datenschutz");
};

module.exports.renderKontakt = (req, res) => {
  res.render("kontakt");
};
