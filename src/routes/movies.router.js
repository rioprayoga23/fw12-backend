const {
  readAllMovies,
  readMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  nowShowing,
  upComing,
  getCity,
} = require("../controllers/movies.controller");
const authMiddleware = require("../middleware/auth.middleware");
const uploadMiddleware = require("../middleware/upload.middleware");

const moviesRouter = require("express").Router();

moviesRouter.get("/", readAllMovies);
moviesRouter.get("/now", nowShowing);
moviesRouter.get("/upcoming", upComing);
moviesRouter.get("/:id/schedule/city", getCity);
moviesRouter.get("/:id", readMovie);
moviesRouter.post("/", authMiddleware, uploadMiddleware, createMovie);
moviesRouter.patch("/:id", authMiddleware, uploadMiddleware, updateMovie);
moviesRouter.delete("/:id", deleteMovie);

module.exports = moviesRouter;
