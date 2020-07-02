const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const { connectToMongo } = require("./utils/database");
const User = require("./models/user");

const testUserId = "5efdabfb388de429c39ce52a"; // should change

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  User.findById(testUserId)
    .then((user) => {
      const { _id, name, email, cart } = user;

      req.user = new User(name, email, cart, _id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Error);

connectToMongo(() => {
  // new User("Siarhei", "test@mail.com", (cart = { items: [] })).save();

  app.listen(3000, () => console.log("Server is working!"));
});
