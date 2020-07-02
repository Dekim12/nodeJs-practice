const Product = require("../models/product");

const getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        products,
        title: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

const getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        products,
        title: "Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      res.render("shop/productDetails", {
        product,
        title: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getCartPage = (req, res, next) => {
  req.user
    .getCartProducts()
    .then((products) => {
      res.render("shop/cart", {
        title: "Product Cart",
        path: "/cart",
        products,
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
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
};

const getOrdersPage = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        title: "Your Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

const postCreateOrder = (req, res, next) => {
  req.user
    .addCartToOrder()
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
