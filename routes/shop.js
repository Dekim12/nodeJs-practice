const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getShopPage);

router.get("/products", shopController.getProductsPage);

router.get("/card", shopController.getCardPage);

router.get("/checkout");

module.exports = router;
