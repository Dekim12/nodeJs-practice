const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProductsPage);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCartPage);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postDeleteCartItem);

router.get("/orders", isAuth, shopController.getOrdersPage);

router.post("/create-order", shopController.postCreateOrder);

module.exports = router;
