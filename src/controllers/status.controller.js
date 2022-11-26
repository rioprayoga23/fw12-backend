const {
  readAllStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} = require("../models/status.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllStatus = (req, res) => {
  readAllStatus((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createStatus = (req, res) => {
  createStatus(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Status added",
      data: results.rows[0],
    });
  });
};

exports.updateStatus = (req, res) => {
  updateStatus(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Status updated",
      data: results.rows[0],
    });
  });
};

exports.deleteStatus = (req, res) => {
  deleteStatus(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Delete Status successfully",
      data: results.rows[0],
    });
  });
};
