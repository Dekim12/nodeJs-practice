const Product = require("../models/product");
const Order = require("../models/order");

const getIndex = (req, res, next) => {
  const { isLoggedIn } = req.session;

  Product.find()
    // .select("title price -_id")
    // .populate("userId", "name")
    .then((products) => {
      res.render("shop/index", {
        products,
        title: "Shop",
        path: "/",
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const getProductsPage = (req, res, next) => {
  const { isLoggedIn } = req.session;

  Product.find()
    .then((products) => {
      res.render("shop/index", {
        products,
        title: "Products",
        path: "/products",
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const getProduct = (req, res, next) => {
  const { productId } = req.params;
  const { isLoggedIn } = req.session;

  Product.findById(productId)
    .then((product) => {
      res.render("shop/productDetails", {
        product,
        title: product.title,
        path: "/products",
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const getCartPage = (req, res, next) => {
  const { isLoggedIn } = req.session;

  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((userData) => {
      const products = userData.cart.items.map((item) => {
        const { _id, title } = item.productId;

        return {
          _id,
          title,
          quantity: item.quantity,
        };
      });

      res.render("shop/cart", {
        title: "Product Cart",
        path: "/cart",
        products,
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res, next) => {
  const { productId } = req.body;
  const currentUser = req.user;

  Product.findById(productId)
    .then((product) => {
      return currentUser.addProductToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

const postDeleteCartItem = (req, res) => {
  const { productId } = req.body;

  req.user
    .deleteProductFromCart(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

const getCheckoutPage = (req, res, next) => {
  const { isLoggedIn } = req.session;

  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
    isLoggedIn,
  });
};

const getOrdersPage = (req, res, next) => {
  const { isLoggedIn } = req.session;

  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        title: "Your Orders",
        path: "/orders",
        orders,
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const postCreateOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((userData) => {
      const productsData = userData.cart.items.reduce(
        (result, item) => {
          result.products.push({
            product: { ...item.productId._doc },
            quantity: item.quantity,
          });
          result.totalPrice += item.quantity * item.productId.price;

          return result;
        },
        { products: [], totalPrice: 0 }
      );

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        ...productsData,
      });

      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getIndex,
  getCartPage,
  postCart,
  getProductsPage,
  getProduct,
  postDeleteCartItem,
  getCheckoutPage,
  getOrdersPage,
  postCreateOrder,
};
