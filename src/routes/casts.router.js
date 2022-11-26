const {
  readAllCasts,
  createCast,
  updateCast,
  deleteCast,
} = require("../controllers/casts.controller");

const castsRouter = require("express").Router();

castsRouter.get("/", readAllCasts);
castsRouter.post("/", createCast);
castsRouter.patch("/:id", updateCast);
castsRouter.delete("/:id", deleteCast);

module.exports = castsRouter;
