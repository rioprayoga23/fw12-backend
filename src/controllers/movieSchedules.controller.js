const {
  readAllMovieSchedules,
  readMovieSchedule,
  createMovieSchedule,
  updateMovieSchedule,
  deleteMovieSchedule,
  getScheduleByMovieId,
} = require("../models/movieSchedules.model");

const { errorHandler } = require("../helpers/errorHandler.helper");
const { Result } = require("express-validator");

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

exports.readMovieSchedule = (req, res) => {
  readMovieSchedule(req.params.id, (error, results) => {
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

exports.getScheduleByMovieId = (req, res) => {
  getScheduleByMovieId(req.query, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "List of schedules",
      results: results.rows,
    });
  });
};
