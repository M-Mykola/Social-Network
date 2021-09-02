const { Router } = require("express");
const { login, register } = require("./controller");

const router = new Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
