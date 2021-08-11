const { Router } = require("express");

const userRouter = require("./modules/user/router");

const postRouter = require("./modules/post/router");

const commentsRouter = require("./modules/comments/router");

const authRouter = require("./modules/auth/router");

const router = new Router();

router.use("/user", userRouter);

router.use("/post", postRouter);

router.use("/comments", commentsRouter);

router.use("/auth", authRouter);

module.exports = router;
