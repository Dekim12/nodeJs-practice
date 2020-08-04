const get404Error = (req, res, next) => {
  res
    .status(404)
    .render("shop/notFound", {
      title: "Page not found",
      isLoggedIn: req.session.isLoggedIn,
    });
};

const get500Error = (req, res, next) => {
  res.status(500).render("shop/500", {
    title: "Error 500!",
    isLoggedIn: req.session.isLoggedIn,
  });
};

module.exports = { get404Error, get500Error };
