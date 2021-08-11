const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: { type: String },
  friends: [{ type: String }],
});

module.exports = model("User", UserSchema);
