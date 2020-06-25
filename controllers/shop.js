const Product = require("../models/product");
const Cart = require("../models/cart");

const getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products, info]) => {
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
    .then(([products, info]) => {
      res.render("shop/productsList", {
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
    .then(([products]) => {
      const product = products[0];

      res.render("shop/productDetails", {
        product,
        title: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getCartPage = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      cart.products.forEach(({ id }, index) => {
        const prod = products.find((item) => item.id === id);

        if (prod) {
          cartProducts.push({
            data: prod,
            count: cart.products[index].count,
          });
        }
      });

      res.render("shop/cart", {
        title: "Product Cart",
        path: "/cart",
        products: cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

const postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then(([products]) => {
      const product = products[0];

      Cart.addProduct(productId, product.price);
    })
    .catch((err) => console.log(err));

  res.redirect("/cart");
};

const postDeleteCartItem = (req, res) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then(([products]) => {
      const prod = products[0];
      Cart.deleteProduct(productId, prod.price);

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
  res.render("shop/orders", {
    title: "Your Orders",
    path: "/orders",
  });
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
};
