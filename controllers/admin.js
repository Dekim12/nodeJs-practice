const Product = require("../models/product");

const getAddProductsPage = (req, res, next) => {
  res.render("admin/addProduct", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProductsPage = (req, res) => {
  const data = req.body;

  new Product(data.productTitle).save();
  res.redirect("/");
};

const getAdminProductsPage = (req, res, next) => {
  res.render("admin/products", {
    title: "Admin Products",
    path: "/admin/products",
  });
};

module.exports = {
  getAddProductsPage,
  postAddProductsPage,
  getAdminProductsPage,
};
