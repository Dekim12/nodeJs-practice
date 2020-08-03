const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

//url - /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProductsPage);

//url - /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Invalid Product Title")
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl", "Invalid Image Url").isURL(),
    body("price", "Invalid Price").isFloat(),
    body("description", "Invalid Description")
      .isLength({ min: 5, max: 300 })
      .isString()
      .trim(),
  ],
  adminController.postAddProductsPage
);

router.get(
  "/edit-product/:productId",
  isAuth,
  adminController.getEditProductPage
);

router.post(
  "/edit-product",
  [
    body("title", "Invalid Product Title")
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl", "Invalid Image Url").isURL(),
    body("price", "Invalid Price").isFloat(),
    body("description", "Invalid Description")
      .isLength({ min: 5, max: 300 })
      .isString()
      .trim(),
  ],
  adminController.postEditProduct
);

router.post("/delete-product", adminController.postDeleteProduct);

router.get("/products", isAuth, adminController.getAdminProductsPage);

module.exports = router;
