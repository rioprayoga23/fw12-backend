const {
  readAllGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../models/genre.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllGenre = (req, res) => {
  readAllGenre((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createGenre = (req, res) => {
  createGenre(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateGenre = (req, res) => {
  updateGenre(req.body, req.params.id, (error, results) => {
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

exports.deleteGenre = (req, res) => {
  deleteGenre(req.params.id, (error, results) => {
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
