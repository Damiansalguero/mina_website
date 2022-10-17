const Expotext = require("../models/expotext");
const { expoTextSchema } = require("../schemas.js");


module.exports.renderNewExpotext = (req, res) => {
  res.render("expotextposts/new");
};

module.exports.createExpotext = async (req, res, next) => {
  const expotext = await new Expotext (req.body.expotext);
  expotext.author = req.user._id;
  await expotext.save();
  req.flash("success", "Der Eintrag wurde erfolgreich erstellt !");
  res.redirect("/wanderausstellung");
};


module.exports.renderEditExpotext = async (req, res) => {
  const { id } = req.params;
  const expotext = await Expotext.findById(req.params.id);
  res.render("expotextposts/edit", { expotext });
};

module.exports.updateExpotext = async (req, res) => {
  const { id } = req.params;
  const expotext = await Expotext.findByIdAndUpdate(id, {
    ...req.body.expotext,
  });
  await expotext.save();
  req.flash("success", "Der Text wurde erfolgreich aktualisiert !");
  res.redirect("/wanderausstellung");
};
