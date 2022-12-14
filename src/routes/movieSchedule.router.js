const {
  readAllMovieSchedules,
  readMovieSchedule,
  createMovieSchedule,
  updateMovieSchedule,
  deleteMovieSchedule,
  getScheduleByMovieId,
} = require("../controllers/movieSchedules.controller");

const movieScheduleRouter = require("express").Router();

movieScheduleRouter.get("/", readAllMovieSchedules);
movieScheduleRouter.get("/:id", readMovieSchedule);
movieScheduleRouter.get("/:id/byMovieId", getScheduleByMovieId);
movieScheduleRouter.post("/", createMovieSchedule);
movieScheduleRouter.patch("/:id", updateMovieSchedule);
movieScheduleRouter.delete("/:id", deleteMovieSchedule);

module.exports = movieScheduleRouter;
