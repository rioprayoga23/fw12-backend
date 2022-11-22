const {
  readAllUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const userRouter = require("express").Router();

userRouter.get("/", readAllUsers);
userRouter.get("/:id", readUser);
userRouter.post("/", createUser);
userRouter.patch("/", updateUser);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
