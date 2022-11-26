const {
  readAllMovieSchedules,
  createMovieSchedule,
  updateMovieSchedule,
  deleteMovieSchedule,
} = require("../models/movieSchedules.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllMovieSchedules = (req, res) => {
  readAllMovieSchedules((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createMovieSchedule = (req, res) => {
  createMovieSchedule(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateMovieSchedule = (req, res) => {
  updateMovieSchedule(req.body, req.params.id, (error, results) => {
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

exports.deleteMovieSchedule = (req, res) => {
  deleteMovieSchedule(req.params.id, (error, results) => {
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
