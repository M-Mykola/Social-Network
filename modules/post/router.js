const { Router } = require("express");

const { create, update, findOne, deleteOne, findAll } = require("./controller");

const { verifyToken } = require("../auth/controller");

const router = new Router();

router.get("/all", verifyToken, findAll);

router.post("/", verifyToken, create);

router.put("/:id", verifyToken, update);

router.get("/:id", verifyToken, findOne);

router.delete("/:id", verifyToken, deleteOne);

module.exports = router;
