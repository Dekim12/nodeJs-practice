const postLoginUser = (req, res) => {
  res.setHeader("Set-Cookie", "isLoggedIn=true");
  res.redirect("/");
};

const getLoginUser = (req, res) => {
  res.render("auth/loginPage", {
    title: "Login",
    path: "/login",
  });
};

module.exports = {
  postLoginUser,
  getLoginUser,
};
