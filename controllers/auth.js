const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getLoginPage = (req, res) => {
  res.render("auth/loginPage", {
    title: "Login",
    path: "/login",
    errorMessage: req.flash("error")[0],
  });
};

const postLoginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email.");

        return res.redirect("/login");
      }

      return bcrypt
        .compare(password, user.password)
        .then((isEqual) => {
          if (!isEqual) {
            req.flash("error", "Invalid password.");

            return res.redirect("/login");
          }

          req.session.isLoggedIn = true;
          req.session.user = user;
          // req.session.save((err) => {   //быть уверенным что сессия сохранилась раньше перенаправления
          //   res.redirect("/");
          // });

          res.redirect("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
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
  });
};

const postSignUpUser = (req, res) => {
  const { name, email, password, confirmedPassword } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash("error", "You have an account.");

        return res.redirect("/login");
      } else if (password !== confirmedPassword) {
        req.flash("error", "Invalid password.");

        return res.redirect("/signup");
      }

      return bcrypt.hash(password, 12);
    })
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
    .catch((err) => console.log(err));
};

module.exports = {
  postLoginUser,
  getLoginPage,
  getLogoutPage,
  postLogoutUser,
  getSignUpPage,
  postSignUpUser,
};
