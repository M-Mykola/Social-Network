const Comment = require("./schema");
const Post = require("../post/schema");

const commetController = {
  async create(req, res, next) {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Not found the Post");
    }
    const comment = await Comment.create({
      text: req.body.text,
      user: req.user.user_id,
    });
    if (comment) {
      post.comments.push(comment.id);
      post.save();
    }
    console.log(post);
    res.status(200).json(comment);
  },
  async update(req, res, next) {
    try {
      const updated = await Comment.findByIdAndUpdate(
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
  async deleteOne(req, res, next) {
    try {
      const deleted = await Comment.findAll(req.params.id);
      if (!deleted) throw `Error while deleting post with id: ${req.params.id}`;
      res.status(200).json(deleted);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = commetController;
