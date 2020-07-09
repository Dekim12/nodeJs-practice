const Product = require("../models/product");

const getAdminProductsPage = (req, res, next) => {
  const { isLoggedIn } = req.session;

  Product.find()
    .then((products) => {
      res.render("admin/products", {
        products,
        title: "Admin Products",
        path: "/admin/products",
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const getAddProductsPage = (req, res, next) => {
  const { isLoggedIn } = req.session;

  res.render("admin/editProduct", {
    title: "Add Product",
    path: "/admin/add-product",
    isLoggedIn,
  });
};

const postAddProductsPage = (req, res) => {
  const { productTitle, imageUrl, price, description } = req.body;
  const userId = req.user._id;

  new Product({ title: productTitle, imageUrl, price, description, userId })
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getEditProductPage = (req, res) => {
  const { isLoggedIn } = req.session;

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
        isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  const { id, productTitle, imageUrl, price, description } = req.body;

  Product.findById(id)
    .then((product) => {
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
