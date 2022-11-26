const {
  readAllMovieGenre,
  createMovieGenre,
  updateMovieGenre,
  deleteMovieGenre,
} = require("../models/movieGenre.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllMovieGenre = (req, res) => {
  readAllMovieGenre((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createMovieGenre = (req, res) => {
  createMovieGenre(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateMovieGenre = (req, res) => {
  updateMovieGenre(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Genre updated",
      data: results.rows[0],
    });
  });
};

exports.deleteMovieGenre = (req, res) => {
  deleteMovieGenre(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Genre deleted",
      data: results.rows[0],
    });
  });
};
