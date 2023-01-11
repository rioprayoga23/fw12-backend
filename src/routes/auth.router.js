const { check } = require("express-validator");

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { rules, validate } = require("../middleware/validator.middleware");

const authRouter = require("express").Router();

authRouter.post("/login", rules("login"), validate, login);
authRouter.post("/register", rules("login"), validate, register);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.post("/resetPassword", resetPassword);

module.exports = authRouter;
