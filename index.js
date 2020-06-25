const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const sequelize = require("./utils/database");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Error);

sequelize
  .sync()
  .then((result) => {
    // console.log("---sync result", result);
    app.listen(3000, () => console.log("server works.........."));
  })
  .catch((err) => console.log(err));
