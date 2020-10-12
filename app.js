const express = require("express");
const app = express();

app.set("view engine", "ejs");

///////////////////// ROUTES /////////////////////////
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
