const Anmeldung = require("../models/wsregistration");
const Workshop = require("../models/workshop");
const { workshopregisterSchema } = require("../schemas.js");
const nodemailer = require("nodemailer");

module.exports.renderAnmeldung = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  res.render("wsregister/register", { workshop });
};

module.exports.createAnmeldung = async (req, res, next) => {
  const output = `
    <h2>Sie Haben eine neue Seminaranmeldung erhalten</h2>
    <h3>Übersicht</h3>
    <ul>
      <li><strong>Seminar:</strong> ${req.body.wsr.title}</li>
      <li><strong>Seminarort:</strong> ${req.body.wsr.location}</li>
      <li><strong>Datum:</strong> ${req.body.wsr.date}</li>
      <li><strong>Name:</strong> ${req.body.wsr.name}</li>
      <li><strong>Adresse:</strong> ${req.body.wsr.street}, ${req.body.wsr.zip}</li>
      <li><strong>Telefon:</strong> ${req.body.wsr.phone}</li>
      <li><strong>Email:</strong> ${req.body.wsr.email}</li>
      <li><strong>Organisation:</strong> ${req.body.wsr.organisation}</li>
      <li><strong>Die Organisation gehört zur:</strong> ${req.body.wsr.orgafield}</li>
      <li><strong>Assistenzbedarf:</strong> ${req.body.wsr.assistance}</li>
      <li><strong>Welcher Assistenzbedarf:</strong> ${req.body.wsr.assistanceneed}</li>
      </ul>
      <h3>Erfahrungen an der Schnittstelle:</h3>
      <p>${req.body.wsr.description}</p>
      <h3>Wünsche an die Workshops:</h3>
      <p>${req.body.wsr.wishes}</p>
      <h3>Verwendung Persönliche Daten</h3>
      <ul>
      <li>Datenverwendung:</strong> ${req.body.wsr.personal1}</li>
      <li>Kontaktweitergabe:</strong> ${req.body.wsr.personal2}</li>
      <li>Kontaktdatennutzung Mina:</strong> ${req.body.wsr.personal3}</li>
      </ul>
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
    to: "vielfalt@mina-berlin.de", // list of receivers
    subject: "Neue Workshopanmeldung", // Subject line
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
    req.flash(
      "info",
      "Vielen Dank für Ihre Anmeldung. Wir überprüfen, ob es noch freie Plätze gibt. Sie erhalten in den kommenden Tagen eine E-Mail von uns."
    );
    res.redirect("/workshops");
  });
};
