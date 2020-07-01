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
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts();
  //   })
  //   .then((products) => {
  //     res.render("shop/cart", {
  //       title: "Product Cart",
  //       path: "/cart",
  //       products,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

const postCart = (req, res, next) => {
  // const { productId } = req.body;
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: productId } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     if (product) {
  //       newQuantity = product.cartItem.quantity + 1;
  //       return [product];
  //     } else {
  //       return Product.findAll({
  //         where: {
  //           id: productId,
  //         },
  //       });
  //     }
  //   })
  //   .then((products) => {
  //     const prod = products[0];
  //     return fetchedCart.addProduct(prod, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));
};

const postDeleteCartItem = (req, res) => {
  // const { productId } = req.body;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts({ where: { id: productId } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     return product.cartItem.destroy();
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));
};

const getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
};

const getOrdersPage = (req, res, next) => {
  // req.user
  //   .getOrders({ include: ["products"] })
  //   .then((orders) => {
  //     res.render("shop/orders", {
  //       title: "Your Orders",
  //       path: "/orders",
  //       orders,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

const postCreateOrder = (req, res, next) => {
  // let fetchedCart;
  // let cartProducts;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts();
  //   })
  //   .then((products) => {
  //     cartProducts = products;
  //     return req.user.createOrder();
  //   })
  //   .then((order) => {
  //     return order.addProducts(
  //       cartProducts.map((prod) => {
  //         prod.orderItem = { quantity: prod.cartItem.quantity };
  //         return prod;
  //       })
  //     );
  //   })
  //   .then(() => {
  //     return fetchedCart.setProducts(null);
  //   })
  //   .then(() => {
  //     res.redirect("/orders");
  //   })
  //   .catch((err) => console.log(err));
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
