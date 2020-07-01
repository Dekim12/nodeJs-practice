const Product = require("../models/product");

const getAddProductsPage = (req, res, next) => {
  res.render("admin/editProduct", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProductsPage = (req, res) => {
  const { productTitle, imageUrl, price, description } = req.body;

  new Product(productTitle, price, imageUrl, description)
    .save()
    .then((result) => {
      console.log("----then", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getEditProductPage = (req, res) => {
  const editMode = req.query.edit;
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        res.redirect("/admin/products");
      }

      res.render("admin/editProduct", {
        title: "Edit Product",
        path: "/admin/edit-products",
        isEdit: !!editMode,
        product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  const { id, productTitle, imageUrl, price, description } = req.body;

  new Product(productTitle, price, imageUrl, description, id)
    .update()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res) => {
  const { id } = req.body;

  Product.deleteById(id)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getAdminProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products,
        title: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAddProductsPage,
  postAddProductsPage,
  getEditProductPage,
  postEditProduct,
  postDeleteProduct,
  getAdminProductsPage,
};
