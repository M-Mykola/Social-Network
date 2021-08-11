const Post = require("./schema");
const CommentSchema = require("../comments/schema");

const postController = {
  async create(req, res, next) {
    console.log(req.user);
    const post = await Post.create({
      title: req.body.title,
      picture: req.body.picture,
      text: req.body.text,
      postedBy: req.user.user_id,
    });
    res.status(200).json(post);
  },
  async update(req, res, next) {
    try {
      const updated = await Post.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (e) {
      next(e);
    }
  },

  async findOne(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  },

  async deleteOne(req, res, next) {
    try {
      const deleted = await Post.findByIdAndDelete(req.params.id);
      if (!deleted) throw `Error while deleting post with id: ${req.params.id}`;
      res.status(200).json(deleted);
    } catch (e) {
      next(e);
    }
  },

  async findAll(req, res, next) {
    try {
      const post = await Post.find().populate("postedBy").populate("comments");
      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  },

  async findUserPosts(req, res, next) {
    try {
      const post = await Post.find({ postedBy: req.params.id })
        .populate("postedBy")
        .populate("comments");
      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = postController;
