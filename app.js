const express = require("express");
const app = express();

///////////////////// ROUTES /////////////////////////
app.get("/", function(req, res) {
  res.send("WORKING!!!!!!!!!!");
});
///////////////////// ROUTES /////////////////////////

app.listen(8080, function() {
  console.log("MINA APP STARTED");
});
