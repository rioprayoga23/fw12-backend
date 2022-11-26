const {
  readAllCinemas,
  readCinema,
  createCinema,
  updateCinema,
  deleteCinema,
} = require("../models/cinemas.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllCinemas = (req, res) => {
  readAllCinemas((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.readCinema = (req, res) => {
  readCinema(req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createCinema = (req, res) => {
  createCinema(req.body, (error, results) => {
    if (error) {
      errorHandler(error, res);
    } else {
      return res.status(200).json({
        success: true,
        message: "Cinema added successfully",
        data: results.rows[0],
      });
    }
  });
};

exports.updateCinema = (req, res) => {
  updateCinema(req.body, req.params.id, (error, results) => {
    console.log(results);
    if (error) {
      return errorHandler(error, res);
    }

    // if (results.rowCount <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Failed to update, Cinema not found",
    //   });
    // } else {
    return res.status(200).json({
      success: true,
      message: "Cinema updated successfully",
      data: results.rows[0],
    });
    // }
  });
};

exports.deleteCinema = (req, res) => {
  deleteCinema(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    // if (results.rowCount <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Failed to delete, Cinema not found",
    //   });
    // } else {
    return res.status(200).json({
      success: true,
      message: "Cinema deleted successfully",
      data: results.rows[0],
    });
    // }
  });
};
