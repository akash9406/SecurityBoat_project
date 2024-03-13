const jwt = require("jsonwebtoken");
const model = require("../model/User");
const User = model.User;

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Login First",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded._id) {
      req.user = await User.findById(decoded._id)
        .select("-token")
        .select("-password");
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Session expired",
    });
  }
};

module.exports = isAuthenticated;
