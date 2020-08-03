const express = require("express");
const { check, body } = require("express-validator");

const User = require("../models/user");
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

router.post(
  "/login",
  [
    body("email", "Please add a valid email.").isEmail().normalizeEmail(),
    body("password", "Your password is too short.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  postLoginUser
);

router.get("/logout", getLogoutPage);

router.post("/logout", postLogoutUser);

router.get("/signup", getSignUpPage);

router.post(
  "/signup",
  [
    check("email", "Please add a valid email.")
      .isEmail()
      .custom((email) => {
        return User.findOne({ email }).then((user) => {
          if (user) {
            return Promise.reject("You have an account with this email.");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Your password is too short.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmedPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }

        return true;
      })
      .trim(),
  ],
  postSignUpUser
);

module.exports = router;
