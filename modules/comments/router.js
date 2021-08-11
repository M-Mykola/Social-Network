const { Router } = require("express");
const { create, update, deleteOne } = require("./controller");
const { verifyToken } = require("../auth/controller");

const router = new Router();

router.post("/:id", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, deleteOne);

module.exports = router;
