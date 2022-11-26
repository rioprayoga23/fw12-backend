const {
  readAllMovieScheduleTimes,
  createMovieScheduleTime,
  updateMovieScheduleTime,
  deleteMovieScheduleTime,
} = require("../models/movieScheduleTimes.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllMovieScheduleTimes = (req, res) => {
  readAllMovieScheduleTimes((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createMovieScheduleTime = (req, res) => {
  createMovieScheduleTime(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateMovieScheduleTime = (req, res) => {
  updateMovieScheduleTime(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "MovieSchedule updated successfully",
      data: results.rows[0],
    });
  });
};

exports.deleteMovieScheduleTime = (req, res) => {
  deleteMovieScheduleTime(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Delete MovieGenre successfully",
      data: results.rows[0],
    });
  });
};
