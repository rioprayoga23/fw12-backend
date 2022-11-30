const {
  readAllMovies,
  readMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  nowShowing,
  upComing,
} = require("../controllers/movies.controller");

const moviesRouter = require("express").Router();

moviesRouter.get("/", readAllMovies);
moviesRouter.get("/now", nowShowing);
moviesRouter.get("/upcoming", upComing);
moviesRouter.get("/:id", readMovie);
moviesRouter.post("/", createMovie);
moviesRouter.patch("/:id", updateMovie);
moviesRouter.delete("/:id", deleteMovie);

module.exports = moviesRouter;
