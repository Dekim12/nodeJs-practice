const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/app-path");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  User.findAll({
    where: {
      id: 1,
    },
  })
    .then((users) => {
      req.user = users[0];

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Error);

Product.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// User.create({ name: "siarhei", email: "test@mail.com", id: 1 }); //create an user

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => console.log("server works.........."));
  })
  .catch((err) => console.log(err));
