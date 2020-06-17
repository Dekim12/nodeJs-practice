const get404Error = (req, res, next) => {
  res.status(404).render("shop/notFound", { title: "Page not found" });
};

module.exports = { get404Error };
