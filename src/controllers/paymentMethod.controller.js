const {
  readAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../models/paymentMethod.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllPayments = (req, res) => {
  readAllPayments((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      results: results.rows,
    });
  });
};

exports.createPayment = (req, res) => {
  createPayment(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updatePayment = (req, res) => {
  updatePayment(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Payment updated",
      data: results.rows[0],
    });
  });
};

exports.deletePayment = (req, res) => {
  deletePayment(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Payment Deleted",
      data: results.rows[0],
    });
  });
};
