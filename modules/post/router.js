const { Router } = require("express");

const {
  create,
  update,
  findOne,
  deleteOne,
  findAll,
  findUserPosts,
} = require("./controller");

const { verifyToken } = require("../auth/controller");
const { find } = require("./schema");

const router = new Router();

router.get("/all", verifyToken, findAll);

router.post("/", verifyToken, create);

router.put("/:id", verifyToken, update);

router.get("/:id", verifyToken, findOne);

router.delete("/:id", verifyToken, deleteOne);

router.get("/findPost/:id", verifyToken, findUserPosts);

module.exports = router;
