const {
  readAllForgotPassword,
  createForgotPassword,
  updateForgotPassword,
  deleteForgotPassword,
} = require("../models/forgotPassword.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllForgotPassword = (req, res) => {
  readAllForgotPassword((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createForgotPassword = (req, res) => {
  createForgotPassword(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateForgotPassword = (req, res) => {
  updateForgotPassword(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "ForgotPassword updated",
      data: results.rows[0],
    });
  });
};

exports.deleteForgotPassword = (req, res) => {
  deleteForgotPassword(req, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Delete ForgotPassword successfully",
      data: results.rows[0],
    });
  });
};
