const Aktuell = require("../models/aktuell");
const Calendar = require("../models/calendar");
const About = require("../models/about");
const Workshop = require("../models/workshop");
const Workshopgallery = require("../models/workshopgallery");
const Timeline = require("../models/timeline");
const Flyer = require("../models/flyer");
const nodemailer = require("nodemailer");
const { cloudinary } = require("../cloudinary");

module.exports.renderLanding = async (req, res) => {
  res.redirect("/home");
};

module.exports.renderhome = async (req, res) => {
  const aktuell = await Aktuell.findOne({});
  const calendars = await Calendar.find({});
  const about = await About.findOne({});
  if (!calendars || !aktuell || !about) {
    res.render("landing");
  } else {
    res.render("landing", {
      aktuell,
      calendars,
      flyer,
      about
    });
  }
};

module.exports.renderWorkshops = async (req, res) => {
  const workshops = await Workshop.find({});
  const workshopgalleries = await Workshopgallery.find({});
  res.render("workshops", { workshops, workshopgalleries });
};

module.exports.renderPartizip = (req, res) => {
  res.render("partizip");
};
module.exports.renderProzess = async (req, res) => {
  const timelines = await Timeline.find({});
  res.render("prozess", { timelines });
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

module.exports.createKontakt = async (req, res, next) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.betreff}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MINA_HOST,
    port: process.env.MINA_PORT2 || process.env.MINA_PORT1,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MINA_MAIL, // generated ethereal user
      pass: process.env.MINA_PW // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Nodemailer Contact" vielfalt@mina-berlin.de', // sender address
    to: "damian.salguero@posteo.de, vielfalt@mina-berlin.de", // list of receivers
    subject: "Neue Kontaktanrage", // Subject line
    text: "Folgende Nachricht wurde Per Kontaktformular gesendet", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    req.flash("info", "Die Email wurde erfolgreich versendet!");
    res.redirect("/kontakt");
  });
};
