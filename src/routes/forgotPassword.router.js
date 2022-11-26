const {
  readAllForgotPassword,
  createForgotPassword,
  updateForgotPassword,
  deleteForgotPassword,
} = require("../controllers/forgotPassword.controller");

const forgotPasswordRouter = require("express").Router();

forgotPasswordRouter.get("/", readAllForgotPassword);
forgotPasswordRouter.post("/", createForgotPassword);
forgotPasswordRouter.patch("/:id", updateForgotPassword);
forgotPasswordRouter.delete("/:id", deleteForgotPassword);

module.exports = forgotPasswordRouter;
