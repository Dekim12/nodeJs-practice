const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoSessionStore = require("connect-mongodb-session")(session);

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://siarhei_1:123698745wasd@cluster0-luq5l.mongodb.net/shopDB?retryWrites=true&w=majority";

const app = express();
const sessionStore = new MongoSessionStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

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

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

app.use(errorController.get404Error);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        new User({
          name: "Siarhei",
          email: "test@mail.com",
          cart: { items: [] },
        }).save();
      }
    });

    app.listen(3000, () => console.log("Server is working!"));
  })
  .catch((err) => console.log(err));
