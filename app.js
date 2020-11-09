const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//////////////// VIEW ENGINSE SETUP ///////////////////
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//////////////// USE ///////////////////
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ROUTES ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
app.get("/", function(req, res) {
  res.send("WORKING!!!!!!!!!!");
});

app.get("/landing", function(req, res) {
  res.render("landing");
});
///////////////////// ROUTES /////////////////////////

app.listen(8080, function() {
  console.log("MINA APP STARTED");
});
