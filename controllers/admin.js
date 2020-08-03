const Product = require("../models/product");
const { validationResult } = require("express-validator");

const getAdminProductsPage = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        products,
        title: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

const getAddProductsPage = (req, res, next) => {
  res.render("admin/editProduct", {
    title: "Add Product",
    path: "/admin/add-product",
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

const postAddProductsPage = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const userId = req.user._id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/editProduct", {
      title: "Add Product",
      path: "/admin/edit-products",
      isEdit: false,
      hasError: true,
      product: {
        title,
        imageUrl,
        price,
        description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  new Product({ title, imageUrl, price, description, userId })
    .save()
    .then((result) => {
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
        hasError: false,
        product,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  const { id, title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/editProduct", {
      title: "Edit Product",
      path: "/admin/edit-products",
      isEdit: true,
      hasError: true,
      product: {
        _id: id,
        title,
        imageUrl,
        price,
        description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;

      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res) => {
  const { id } = req.body;

  Product.findByIdAndRemove(id)
    .then((result) => {
      res.redirect("/admin/products");
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
