const express = require("express");
const UserController = require("../controller/User");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router
  .post("/login", UserController.Login)
  .post("/signup", UserController.Signup)
  .get("/logout", UserController.Logout)
  .get("/me", isAuthenticated, UserController.getMyProfile);

exports.router = router;
