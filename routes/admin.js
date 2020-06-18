const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

//url - /admin/add-product => GET
router.get("/add-product", adminController.getAddProductsPage);

//url - /admin/add-product => POST
router.post("/add-product", adminController.postAddProductsPage);

router.get("/edit-product/:productId", adminController.getEditProductPage);

router.post("/edit-product", adminController.postEditProduct);

router.get("/products", adminController.getAdminProductsPage);

module.exports = router;
