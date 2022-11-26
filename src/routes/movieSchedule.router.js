const {
  readAllMovieSchedules,
  createMovieSchedule,
  updateMovieSchedule,
  deleteMovieSchedule,
} = require("../controllers/movieSchedules.controller");

const movieScheduleRouter = require("express").Router();

movieScheduleRouter.get("/", readAllMovieSchedules);
movieScheduleRouter.post("/", createMovieSchedule);
movieScheduleRouter.patch("/:id", updateMovieSchedule);
movieScheduleRouter.delete("/:id", deleteMovieSchedule);

module.exports = movieScheduleRouter;
