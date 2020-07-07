const express = require("express");

const { getLoginUser, postLoginUser } = require("../controllers/auth");

const router = express.Router();

router.get("/login", getLoginUser);

router.post("/login", postLoginUser);

module.exports = router;
