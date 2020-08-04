const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

const getLoginPage = (req, res) => {
  res.render("auth/loginPage", {
    title: "Login",
    path: "/login",
    errorMessage: req.flash("error")[0],
    oldInputsValues: {},
  });
};

const postLoginUser = (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/loginPage", {
      title: "Login",
      path: "/login",
      errorMessage: errors.array()[0].msg,
      oldInputsValues: { email, password },
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/loginPage", {
          title: "Login",
          path: "/login",
          errorMessage: "Invalid Email or Password",
          oldInputsValues: { email, password },
        });
      }

      return bcrypt
        .compare(password, user.password)
        .then((isEqual) => {
          if (!isEqual) {
            return res.status(422).render("auth/loginPage", {
              title: "Login",
              path: "/login",
              errorMessage: "Invalid Email or Password",
              oldInputsValues: { email, password },
            });
          }

          req.session.isLoggedIn = true;
          req.session.user = user;
          // req.session.save((err) => {   //быть уверенным что сессия сохранилась раньше перенаправления
          //   res.redirect("/");
          // });

          res.redirect("/");
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;

          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;

      return next(error);
    });
};

const getLogoutPage = (req, res) => {
  res.render("auth/logoutPage", {
    title: "Logout",
    path: "/logout",
  });
};

const postLogoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);

    res.redirect("/");
  });
};

const getSignUpPage = (req, res) => {
  res.render("auth/signupPage", {
    title: "SignUp",
    path: "/signup",
    errorMessage: req.flash("error")[0],
    oldInputsValues: {},
    validationErrors: [],
  });
};

const postSignUpUser = (req, res, next) => {
  const { name, email, password, confirmedPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signupPage", {
      title: "SignUp",
      path: "/signup",
      errorMessage: errors.array()[0].msg,
      oldInputsValues: { name, email, password, confirmedPassword },
      validationErrors: errors.array(),
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      if (!hashPassword) {
        return;
      }

      return new User({
        name,
        email,
        password: hashPassword,
        cart: { items: [] },
      }).save();
    })
    .then((user) => {
      if (!user) {
        return;
      }

      req.session.isLoggedIn = true;
      req.session.user = user;

      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;

      return next(error);
    });
};

module.exports = {
  postLoginUser,
  getLoginPage,
  getLogoutPage,
  postLogoutUser,
  getSignUpPage,
  postSignUpUser,
};
