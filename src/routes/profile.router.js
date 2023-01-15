const {
  readAllProfile,
  updateProfile,
  readProfile,
} = require("../controllers/profile.controller");
const uploadMiddleware = require("../middleware/upload.middleware");
const { rules, validate } = require("../middleware/validator.middleware");

const userRouter = require("express").Router();

userRouter.get("/", readProfile);
userRouter.patch(
  "/",
  uploadMiddleware,
  rules("resetPassword"),
  validate,
  updateProfile
);

module.exports = userRouter;
