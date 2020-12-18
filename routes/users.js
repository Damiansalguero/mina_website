const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.registerUser));

router.get("/login", users.renderLogin);
//Argument being passed to authenticate() is which form of authentication is being used
//Everything in {} afterwards are the specified options
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login"
  }),
  users.loginRedirect
);

router.get("/logout", users.logout);

module.exports = router;
