const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const User = require("./models/user");

const testUserId = "5f030bbc0ae86c3d8b102698"; // should change

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  User.findById(testUserId)
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
  .connect(
    "mongodb+srv://siarhei_1:123698745wasd@cluster0-luq5l.mongodb.net/shopDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
