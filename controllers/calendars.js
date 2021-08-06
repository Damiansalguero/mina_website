const fns = require("date-fns");
const Calendar = require("../models/calendar");
const { calendarSchema } = require("../schemas.js");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const calendars = await Calendar.find().sort({ date: -1 });
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
  res.render("calendarposts/index", { calendars: formatedDate });
};

module.exports.renderNewCalendar = (req, res) => {
  res.render("calendarposts/new");
};

module.exports.createCalendar = async (req, res, next) => {
  const calendar = await new Calendar(req.body.calendar);
  await calendar.save();
  req.flash("success", "Der Kalendareintrag wurde erfolgreich erstellt !");
  res.redirect("/calendars/alle");
};

module.exports.renderEditCalendar = async (req, res) => {
  const { id } = req.params;
  const calendar = await Calendar.findById(req.params.id);
  res.render("calendarposts/edit", { calendar });
};

module.exports.showCalendar = async (req, res) => {
  const calendar = await Calendar.findById(req.params.id);
  const formatedDate = fns.format(new Date(calendar.date), "dd.MM.yyyy");
  if (!calendar) {
    req.flash("error", "Dieser Eintrag existiert nicht mehr !");
    return res.redirect("/home");
  }
  res.render("calendarposts/show", { calendar, formatedDate });
};

module.exports.updateCalendar = async (req, res) => {
  const { id } = req.params;
  const calendar = await Calendar.findByIdAndUpdate(id, {
    ...req.body.calendar,
  });
  await calendar.save();
  req.flash("success", "Der Kalendareintrag wurde erfolgreich aktualisiert !");
  res.redirect("/calendars/alle");
};

module.exports.deleteCalendar = async (req, res) => {
  const { id } = req.params;
  await Calendar.findByIdAndDelete(id);
  req.flash("success", "Der Kalendareintrag wurde erfolgreich gelöscht !");
  res.redirect("/home");
};
