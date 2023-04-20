const Aktuell = require("../models/aktuell");
const Calendar = require("../models/calendar");
const About = require("../models/about");
const Wsnew = require("../models/wsaktuell");
const Workshop = require("../models/workshop");
const Workshopgallery = require("../models/workshopgallery");
const Workshopflyer = require("../models/wsflyer");
const Workshopthreetext = require("../models/workshopthreetext");
const Partizip = require("../models/partizip");
const Partizipgallery = require("../models/partizipgallery");
const Prozess = require("../models/prozess");
const Processgallery = require("../models/process");
const Prozessflyer = require("../models/prozessflyer");
const Begleitungsgallery = require("../models/begleitung");
const Prozessthree = require("../models/processthree");
const Processthreegallery = require("../models/processthreegallery");
const Prozessthreeflyer = require("../models/processthreeflyer");
const Partflyer = require("../models/partizipflyer");
const Expotext = require("../models/expotext");
const Expoflyer = require("../models/expoflyer");
const Expogallery = require("../models/expogallery");
const Timeline = require("../models/timeline");
const Timelinetwo = require("../models/timelinetwo");
const Timelinethree = require("../models/timelinethree.js");
const Flyer = require("../models/landingflyer");
const Ukrtext = require("../models/ukrtext")
const Bib = require("../models/bib");
const nodemailer = require("nodemailer");
const { cloudinary } = require("../cloudinary");
const fns = require("date-fns");

module.exports.renderLanding = async (req, res) => {
  res.redirect("/home");
};

module.exports.renderhome = async (req, res) => {
  const aktuell = await Aktuell.findOne({});
  const calendars = await Calendar.find().sort({ date: 1 }).limit(3);
  const formatedDate = calendars.map((calendar) => {
    calendar.formatedDate = fns.format(new Date(calendar.date), "dd.MM.yyyy");
    return calendar;
    // return {
    //   title: calendar.title,
    //   link: calendar.link,
    //   description: calendar.description,
    //   formatedDate: fns.format(new Date(calendar.date), "dd.MM.yyyy"),
    // };
  });
  const about = await About.findOne({});
  const flyer = await Flyer.findOne({});
  res.render("landing", {
    aktuell,
    calendars: formatedDate,
    about,
    flyer,
  });
};

module.exports.renderWorkshops = async (req, res) => {
  const wsnew = await Wsnew.findOne({});
  const workshops = await Workshop.find({});
  const wsgs = await Workshopgallery.find({});
  const wsflyer = await Workshopflyer.findOne({});
  res.render("workshops", { workshops, wsgs, wsnew, wsflyer });
};

module.exports.renderWorkshopsTwo = async (req, res) => {
  const wsnew = await Wsnew.findOne({});
  const workshops = await Workshop.find({});
  const wsgs = await Workshopgallery.find({});
  res.render("workshopstwo", { workshops, wsgs, wsnew });
};

module.exports.renderWorkshopsThree =  async (req, res) => {
  const wsthreetext = await Workshopthreetext.findOne({});
  res.render("workshopsthree", {wsthreetext});
};

module.exports.renderPartizip = async (req, res) => {
  const partizip = await Partizip.findOne({});
  const ptgs = await Partizipgallery.find({});
  const partflyer = await Partflyer.findOne({});
  res.render("partizip", { partizip, ptgs, partflyer });
};

module.exports.renderPodcast = async (req, res) => {
  res.render("podcast");
};

module.exports.renderExpo = async (req, res) => {
  const expoflyers = await Expoflyer.find({});
  const expotext = await Expotext.findOne({});
  const partizip = await Partizip.findOne({});
  const egls = await Expogallery.find({});

  res.render("expo", { partizip, expoflyers, expotext, egls });
};
module.exports.renderProzess = async (req, res) => {
  const timeline = await Timeline.findOne({});
  const przgs = await Processgallery.find({});

  res.render("prozess", { timeline, przgs });
};

module.exports.renderProzessTwo = async (req, res) => {
  const prozess = await Prozess.findOne({});
  const prozessflyer = await Prozessflyer.findOne({});
  const timelinetwo = await Timelinetwo.findOne({});
  const bglgs = await Begleitungsgallery.find({});

  res.render("prozesstwo", {prozess, prozessflyer, timelinetwo, bglgs});
};

module.exports.renderProzessThree = async (req, res) => {
  const przthree = await Prozessthree.findOne({});
  const processthreeflyer = await Prozessthreeflyer.findOne({});
  const przgthrees = await Processthreegallery.find({});
  const timelinethree = await Timelinethree.findOne({});
  // const bglgs = await Begleitungsgallery.find({});

  res.render("prozessthree", {przthree,  processthreeflyer, przgthrees, timelinethree});
};

module.exports.renderUkraine = async (req, res) => {
  const ukrtext = await Ukrtext.findOne({});
  res.render("ukraine", {ukrtext});
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

module.exports.renderBib = async (req, res) => {
  const bibs = await Bib.find({});
  res.render("bib", { bibs });
};

module.exports.renderKontakt = (req, res) => {
  res.render("kontakt");
};

module.exports.createKontakt = async (req, res, next) => {
  const output = `
    <p>Sie haben eine neue Kontaktanfrage erhalten</p>
    <h3>Übersicht</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Betreff: ${req.body.betreff}</li>
      <li>Email: ${req.body.email}</li>
      <li>Telefon: ${req.body.phone}</li>
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
      pass: process.env.MINA_PW, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Nodemailer Contact" vielfalt@mina-berlin.de', // sender address
    to: "vielfalt@mina-berlin.de", // list of receivers
    subject: "Neue Kontaktanfrage", // Subject line
    text: "Folgende Nachricht wurde Per Kontaktformular gesendet", // plain text body
    html: output, // html body
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
