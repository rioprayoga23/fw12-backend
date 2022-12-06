const {
  readAllProfile,
  updateProfile,
  readProfile,
} = require("../controllers/profile.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

const userRouter = require("express").Router();

userRouter.get("/", readProfile);
userRouter.patch("/", uploadMiddleware, updateProfile);

module.exports = userRouter;
