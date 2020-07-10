const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

//url - /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProductsPage);

//url - /admin/add-product => POST
router.post("/add-product", adminController.postAddProductsPage);

router.get(
  "/edit-product/:productId",
  isAuth,
  adminController.getEditProductPage
);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

router.get("/products", isAuth, adminController.getAdminProductsPage);

module.exports = router;
