const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Comment", CommentSchema);
