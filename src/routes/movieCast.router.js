const {
  readAllMovieCast,
  createMovieCast,
  updateMovieCast,
  deleteMovieCast,
} = require("../controllers/movieCast.controller");

const GenreRouter = require("express").Router();

GenreRouter.get("/", readAllMovieCast);
GenreRouter.post("/", createMovieCast);
GenreRouter.patch("/:id", updateMovieCast);
GenreRouter.delete("/:id", deleteMovieCast);

module.exports = GenreRouter;
