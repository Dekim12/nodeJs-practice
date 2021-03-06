const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProductsPage);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCartPage);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postDeleteCartItem);

router.get("/checkout", shopController.getCheckoutPage);

router.get("/orders", shopController.getOrdersPage);

module.exports = router;
