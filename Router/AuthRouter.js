const express = require("express");
const router = express.Router();

const { Register, login, logout } = require("../Controller/UserAuthController");

router.post("/register", Register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
