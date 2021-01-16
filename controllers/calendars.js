const Calendar = require("../models/calendar");
const { calendarSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const calendars = await Calendar.find({});
  res.render("calendarposts/index", { calendars });
};

module.exports.renderNewCalendar = (req, res) => {
  res.render("calendarposts/new");
};

module.exports.createCalendar = async (req, res, next) => {
  const calendar = await new Calendar(req.body.calendar);
  calendar.author = req.user._id;
  await calendar.save();
  req.flash("success", "Der Kalendareintrag wurde erfolgreich erstellt !");
  res.redirect("/calendars/<%=calendar._id%>");
};

module.exports.renderEditCalendar = async (req, res) => {
  const { id } = req.params;
  const calendar = await Calendar.findById(req.params.id);
  res.render("calendarposts/edit", { calendar });
};

module.exports.showCalendar = async (req, res) => {
  const calendar = await Calendar.findById(req.params.id);
  if (!calendar) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/mina/home");
  }
  res.render("calendarposts/show", { calendar });
};

module.exports.updateCalendar = async (req, res) => {
  const { id } = req.params;
  const calendar = await Calendar.findByIdAndUpdate(id, {
    ...req.body.calendar
  });
  await calendar.save();
  req.flash("success", "Der Kalendareintrag wurde erfolgreich aktualisiert !");
  res.redirect("/mina/home");
};

module.exports.deleteCalendar = async (req, res) => {
  const { id } = req.params;
  await Calendar.findByIdAndDelete(id);
  res.redirect("/mina/home");
};
