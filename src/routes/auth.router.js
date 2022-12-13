const { check } = require("express-validator");

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.post(
  "/register",
  check("phoneNumber", "Phone Number invalid").isMobilePhone("id-ID"),
  register
);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.post("/resetPassword", resetPassword);

module.exports = authRouter;
