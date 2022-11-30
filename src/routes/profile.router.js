const {
  readAllProfile,
  updateProfile,
  readProfile,
} = require("../controllers/profile.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

const userRouter = require("express").Router();

userRouter.get("/", readAllProfile);
userRouter.get("/:id", readProfile);
userRouter.patch("/:id", uploadMiddleware, updateProfile);

module.exports = userRouter;
