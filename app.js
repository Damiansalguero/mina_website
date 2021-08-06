if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

///////// NPM PACKAGES //////////////
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const {
  dataSchema,
  testDataSchema,
  timelineSchema,
  flyerSchema,
} = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//"mongodb://localhost:27017/mina"
//process.env.DB_URL ||
// const dbUrl = process.env.DB_URL;
const dbUrl = "mongodb://localhost:27017/mina";
const MongoStore = require("connect-mongo")(session);
//////////////// MODEL IMPORT //////////////////
const User = require("./models/user");

//////////////// ROUTES IMPORT ///////////////////
const aktuellesRoutes = require("./routes/aktuelles");
const calendarRoutes = require("./routes/calendars");
const aboutRoutes = require("./routes/abouts");
const wsnewsRoutes = require("./routes/wsaktuelles");
const workshopRoutes = require("./routes/workshops");
const wsregisterRoutes = require("./routes/wsregistrations");
const partizipRoutes = require("./routes/partizips");
const prozessRoutes = require("./routes/processes");
const timelineRoutes = require("./routes/timelines");
const landingflyerRoutes = require("./routes/landingflyers");
const userRoutes = require("./routes/users");
const showRoutes = require("./routes/shows");
const bibRoutes = require("./routes/bibs");
const testRoutes = require("./routes/tests");
const postRoutes = require("./routes/posts");
const partflyerRoutes = require("./routes/partizipflyers");

//////////////// MONGO DB SETUP ///////////////////
//Online DB dbUrl
//
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MONGO DATABASE CONNECTED");
});

//////////////// VIEW ENGINE SETUP ///////////////////
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//////////////// USE ///////////////////
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//////////////// USE SESSION ///////////////////
const secret = process.env.SECRET || "newSecret";
const store = new MongoStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STROE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

//////////////// USE  FLASH ///////////////////
app.use(flash());

//////////////// USE  PASSPORT ///////////////////
app.use(passport.initialize());
app.use(passport.session());
//.authenticate(), .serializeUser(), deserializeUser() are built in methods from passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//////////////// USE MIDDLEWARE EVERYWHERE ///////////////////
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});

//////////////// USE  ROUTEHANDLERS ///////////////////
app.use("/", showRoutes);
app.use("/admin", userRoutes);
app.use("/aktuelles", aktuellesRoutes);
app.use("/calendars", calendarRoutes);
app.use("/ueberehrenamt", aboutRoutes);
app.use("/workshop", workshopRoutes);
app.use("/anmeldung", wsregisterRoutes);
app.use("/ueberworkshops", wsnewsRoutes);
app.use("/partizipatives", partizipRoutes);
app.use("/prozesse", prozessRoutes);
app.use("/zeitstrahl", timelineRoutes);
app.use("/landing-flyers", landingflyerRoutes);
app.use("/partizip-flyers", partflyerRoutes);
app.use("/bibliothek", bibRoutes);
app.use("/posts", postRoutes);
app.use("/test", testRoutes);

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ROUTES ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Seite nicht gefunden", 404));
// });

////////////////// ERROR HANDLER /////////////////////////
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Ups, etwas ist schief gelaufen";
  }

  res.status(statusCode).render("error", { err });
  console.log("ERROR-MESSAGE !!!!!!", err);
});

//////////////// SERVER ROUTE ///////////////////
const port = process.env.PORT || 1024;
app.listen(port, () => {
  console.log("LISTENING ON PORT 1024");
});
