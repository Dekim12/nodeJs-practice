const express = require("express");

const {
  getLoginPage,
  postLoginUser,
  getLogoutPage,
  postLogoutUser,
  getSignUpPage,
  postSignUpUser,
} = require("../controllers/auth");

const router = express.Router();

router.get("/login", getLoginPage);

router.post("/login", postLoginUser);

router.get("/logout", getLogoutPage);

router.post("/logout", postLogoutUser);

router.get("/signup", getSignUpPage);

router.post("/signup", postSignUpUser);

module.exports = router;
