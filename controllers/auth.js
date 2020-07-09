const User = require("../models/user");

const testUserId = "5f030bbc0ae86c3d8b102698"; // should change

const postLoginUser = (req, res) => {
  User.findById(testUserId)
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      // req.session.save((err) => {   //быть уверенным что сессия сохранилась раньше перенаправления
      //   res.redirect("/");
      // });

      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const getLoginPage = (req, res) => {
  res.render("auth/loginPage", {
    title: "Login",
    path: "/login",
  });
};

const getLogoutPage = (req, res) => {
  const { isLoggedIn } = req.session;

  res.render("auth/logoutPage", {
    title: "Logout",
    path: "/logout",
    isLoggedIn,
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
  });
};

const postSignUpUser = (req, res) => {};

module.exports = {
  postLoginUser,
  getLoginPage,
  getLogoutPage,
  postLogoutUser,
  getSignUpPage,
  postSignUpUser,
};
