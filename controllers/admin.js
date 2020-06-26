const Product = require("../models/product");

const getAddProductsPage = (req, res, next) => {
  res.render("admin/editProduct", {
    title: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProductsPage = (req, res) => {
  const { productTitle, imageUrl, price, description } = req.body;

  req.user
    .createProduct({
      title: productTitle,
      price,
      imageUrl,
      description,
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getEditProductPage = (req, res) => {
  const editMode = req.query.edit;
  const { productId } = req.params;

  req.user
    .getProducts({
      where: {
        id: productId,
      },
    })
    .then((products) => {
      const product = products[0];

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

  req.user
    .getProducts({ where: { id } })
    .then((products) => {
      const product = products[0];

      product.title = productTitle;
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

  req.user
    .getProducts({
      where: {
        id,
      },
    })
    .then((products) => {
      return products[0].destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getAdminProductsPage = (req, res, next) => {
  req.user
    .getProducts()
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
