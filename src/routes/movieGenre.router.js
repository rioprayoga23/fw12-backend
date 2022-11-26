const {
  readAllMovieGenre,
  createMovieGenre,
  updateMovieGenre,
  deleteMovieGenre,
} = require("../controllers/movieGenre.controller");

const movieGenreRouter = require("express").Router();

movieGenreRouter.get("/", readAllMovieGenre);
movieGenreRouter.post("/", createMovieGenre);
movieGenreRouter.patch("/:id", updateMovieGenre);
movieGenreRouter.delete("/:id", deleteMovieGenre);

module.exports = movieGenreRouter;
