const Product = require("../models/product");

const getShopPage = (req, res, next) => {
  res.render("shop/index", {
    title: "Shop",
    path: "/",
  });
};

const getProductsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/productsList", {
      products,
      title: "Products",
      path: "/products",
    });
  });
};

const getCardPage = (req, res, next) => {
  res.render("shop/card", {
    title: "Product Card",
    path: "/card",
  });
};

module.exports = {
  getShopPage,
  getCardPage,
  getProductsPage,
};
