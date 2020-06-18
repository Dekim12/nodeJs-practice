const Product = require("../models/product");

const getAddProductsPage = (req, res, next) => {
  res.render("admin/editProduct", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProductsPage = (req, res) => {
  const { productTitle, imageUrl, price, description } = req.body;

  new Product(null, productTitle, imageUrl, description, price).save();
  res.redirect("/");
};

const getEditProductPage = (req, res) => {
  const editMode = req.query.edit;
  const { productId } = req.params;

  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }

    res.render("admin/editProduct", {
      title: "Edit Product",
      path: "/admin/edit-products",
      isEdit: !!editMode,
      product,
    });
  });
};

const postEditProduct = (req, res) => {
  const { id, productTitle, imageUrl, price, description } = req.body;

  new Product(id, productTitle, imageUrl, description, price).save();
  res.redirect("/admin/products");
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
  getEditProductPage,
  postEditProduct,
  getAdminProductsPage,
};
