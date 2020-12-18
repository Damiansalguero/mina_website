const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    //login() method makes sure a user gets logged in right after register
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash(
        "success",
        "Deine Registrierung wurde erfolgreich abgeschlossen. Willkommen, " +
          user.username
      );
      res.redirect("/mina");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.loginRedirect = (req, res) => {
  req.flash("success", "Willkommen zurück !");
  //This guarantees, that the last path is being saved and returns after login
  //Setup in middleware.js
  const redirectUrl = req.session.returnTo || "/mina";
  //This takes the returnTo info out so it cannot be seen
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("info", "Du bist jetzt ausgeloggt !");
  res.redirect("/mina");
};
