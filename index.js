const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require("csurf");
const session = require("express-session");
const flash = require("connect-flash");
const MongoSessionStore = require("connect-mongodb-session")(session);

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const User = require("./models/user");
const { error } = require("console");

const MONGODB_URI =
  "mongodb+srv://siarhei_1:123698745wasd@cluster0-luq5l.mongodb.net/shopDB?retryWrites=true&w=majority";

const app = express();
const sessionStore = new MongoSessionStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

//configure sessions
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(csrfProtection); //must be after session
app.use(flash());

//added local variables for all pages
//should be before routes
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => next(new Error(err)));
});

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

app.get("/500", errorController.get500Error);

app.use(errorController.get404Error);

app.use((err, req, res, next) => {
  res.status(500).render("shop/500", {
    title: "Error 500!",
    path: "/500",
    isLoggedIn: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(3000, () => console.log("Server is working!"));
  })
  .catch((err) => console.log(err));
