const {
  readAllMovieScheduleTimes,
  createMovieScheduleTime,
  updateMovieScheduleTime,
  deleteMovieScheduleTime,
} = require("../controllers/movieScheduleTimes.controller");

const moviesScheduleTimeRouter = require("express").Router();

moviesScheduleTimeRouter.get("/", readAllMovieScheduleTimes);
moviesScheduleTimeRouter.post("/", createMovieScheduleTime);
moviesScheduleTimeRouter.patch("/:id", updateMovieScheduleTime);
moviesScheduleTimeRouter.delete("/:id", deleteMovieScheduleTime);

module.exports = moviesScheduleTimeRouter;
