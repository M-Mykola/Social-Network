const { Router } = require("express");
const {
  create,
  update,
  findOne,
  findAll,
  deleteOne,
  addFriend,
} = require("./controller");
const { verifyToken } = require("../auth/controller");

const router = new Router();

router.post("/", verifyToken, create);

router.post("/addFriend/:id", verifyToken, addFriend);

router.put("/:id", verifyToken, update);

router.get("/all", verifyToken, findAll);

router.get("/:id", verifyToken, findOne);

router.delete("/:id", verifyToken, deleteOne);

module.exports = router;
