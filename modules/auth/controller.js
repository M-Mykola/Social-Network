const User = require("../user/schema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!(name && email && password)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await User.findOne({ email });
      console.log(password);
      if (oldUser) {
        return res.status(409).send("User is Already Exist. Please Login");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      console.log(encryptedPassword);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      return res.status(201).json("User created");
    } catch (e) {
      next(e);
    }
  },
  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("Not found");
      }

      const encryptedPassword = await bcrypt.hash(req.body.password, 10);

      console.log(encryptedPassword);

      const result = await bcrypt.compare(req.body.password, user.password);

      if (!result) {
        return res.status(403).send("Not correct a password");
      }

      const token = jwt.sign(
        { user_id: user._id, email: req.body.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ user_name, token });
    } catch (e) {
      next(e);
    }
  },
  async verifyToken(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  },
};
module.exports = authController;
