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
authRouter.post("/register", rules("register"), validate, register);
authRouter.post(
  "/forgotPassword",
  rules("forgotPassword"),
  validate,
  forgotPassword
);
authRouter.post("/resetPassword", rules("register"), validate, resetPassword);

module.exports = authRouter;
