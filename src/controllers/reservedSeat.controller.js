const {
  readAllReservedSeat,
  createReservedSeat,
  updateReservedSeat,
  deleteReservedSeat,
} = require("../models/reservedSeat.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllReservedSeat = (req, res) => {
  readAllReservedSeat((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createReservedSeat = (req, res) => {
  createReservedSeat(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateReservedSeat = (req, res) => {
  updateReservedSeat(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "ReservedSeat updated",
      data: results.rows[0],
    });
  });
};

exports.deleteReservedSeat = (req, res) => {
  deleteReservedSeat(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "ReservedSeat deleted",
      data: results.rows[0],
    });
  });
};
