const { create } = require("../post/schema");
const User = require("./schema");

const UserController = {
  async create(req, res, next) {
    try {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const test = re.test(String(req.body.email).toLowerCase());
      if (!test) return res.status(401).json({ error: "Invalid email" });
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(user);
      res.status(201).json("welcome");
    } catch (e) {
      next(e);
    }
  },
  async addFriend(req, res, next) {
    const friend = await User.findById(req.params.id);
    if (!friend) {
      return res.status(404).json("Not found user");
    }
    const user = await User.findById(req.user.user_id);
    if (user.friends.includes(req.params.id)) {
      return res
        .status(401)
        .json({ mesagge: "User has already been added to friends list" });
    }
    user.friends.push(friend.id);
    user.save();
    res.status(200).json(user);
  },

  async update(req, res, next) {
    try {
      const updated = await User.findByIdAndUpdate(
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
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },

  async findAll(req, res, next) {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },

  async deleteOne(req, res, next) {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      if (!deleted) throw `Error while deleting user with id: ${req.params.id}`;
      res.status(200).json(deleted);
    } catch (e) {
      next(e);
    }
  },
};
module.exports = UserController;
