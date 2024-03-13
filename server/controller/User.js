const model = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = model.User;
exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
      return res.status(401).json({
        message: "wrong password",
      });
    }
    var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        message: "Login succesfull",
      });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
exports.getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(401);
  }
};
exports.Logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};

exports.Signup = async (req, res) => {
  try {
    const valid = await User.findOne({ email: req.body.email });
    if (valid) {
      return req.status(400).json({
        message: "Username already exist",
      });
    }
    const user = new User(req.body);
    const hashed = await bcrypt.hash(req.body.password, 10);
    user.password = hashed;
    await user.save();
    var token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        message: "Signup succesfull",
      });
  } catch (err) {
    res.status(401).json({
      message: "unable to singup",
    });
  }
};
