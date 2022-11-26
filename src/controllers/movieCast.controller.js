const {
  getAllMovieCast,
  createMovieCast,
  updateMovieCast,
  deleteMovieCast,
} = require("../models/movieCast.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllMovieCast = (req, res) => {
  getAllMovieCast((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createMovieCast = (req, res) => {
  createMovieCast(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateMovieCast = (req, res) => {
  updateMovieCast(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "MovieGenre updated",
      data: results.rows[0],
    });
  });
};

exports.deleteMovieCast = (req, res) => {
  deleteMovieCast(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "MovieGenre deleted",
      data: results.rows[0],
    });
  });
};
