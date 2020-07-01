const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const { connectToMongo } = require("./utils/database");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  // User.findAll({
  //   where: {
  //     id: 1,
  //   },
  // })
  //   .then((users) => {
  //     req.user = users[0];
  //     next();
  //   })
  //   .catch((err) => console.log(err));

  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Error);

connectToMongo(() => {
  app.listen(3000, () => console.log("Server is working!"));
});
