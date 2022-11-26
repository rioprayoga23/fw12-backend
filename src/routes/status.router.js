const {
  readAllStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");

const statusRouter = require("express").Router();

statusRouter.get("/", readAllStatus);
statusRouter.post("/", createStatus);
statusRouter.patch("/:id", updateStatus);
statusRouter.delete("/:id", deleteStatus);

module.exports = statusRouter;
