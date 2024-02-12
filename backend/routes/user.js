const express = require("express");
const {
  loginUser,
  logoutUser,
  getAllUsers
} = require("../controllers/user");
const { verifyToken } = require("../auth/auth");
const validation = require("../validations/validation")();

const userRouter = express.Router();

userRouter.post("/login", validation.loginUser, loginUser);
userRouter.post("/logout", verifyToken, validation.logoutUser, logoutUser);
userRouter.get("/getAllUsers", verifyToken, getAllUsers);


module.exports = userRouter;
