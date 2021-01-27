const Test = require("../models/test");
const Post = require("../models/post");
const nodemailer = require("nodemailer");

const { dataSchema, testdataSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.renderTest = async (req, res) => {
  // const tests = await Test.find({});
  // const posts = await Post.find({});
  res.render("tests/test");
};

module.exports.renderTestform = (req, res) => {
  res.render("tests/new");
};

module.exports.createTest = async (req, res, next) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "mail.aikq.de",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.MAIL_PW // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Nodemailer Contact" damian.salguero@aikq.de', // sender address
    to: "damian.salguero@posteo.de", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Test, um zu sehen, ob die Email geendet wird", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("BODYYYYYYYYYYYYYY", req.body);
    res.send("Email Route Worked");
    // req.flash("success", "Die Email wurde erfolgreich versendet!");
    // res.render("tests/test");
  });
  // res.redirect("/test");
};

module.exports.showTest = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    req.flash("error", "Dieser Test existiert nicht mehr !");
    return res.redirect("/mina/home");
  }
  res.render("tests/test", { test });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(req.params.id);
  res.render("tests/edit", { test });
};

module.exports.updatetest = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findByIdAndUpdate(id, {
    ...req.body.test
  });
  const imgs = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }));
  test.images.push(...imgs);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await test.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }

  await test.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await test.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } }
    });
  }
  req.flash("success", "Test wurde erfolgreich aktualisiert");
  res.redirect(`/test/${test._id}`);
};

module.exports.deletetest = async (req, res) => {
  const { id } = req.params;
  await Test.findByIdAndDelete(id);
  res.redirect("/test");
};
