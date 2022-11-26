const {
  readAllSubscribers,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber,
} = require("../models/subscribers.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllSubscribers = (req, res) => {
  readAllSubscribers((error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createSubscriber = (req, res) => {
  createSubscriber(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: results.rows[0],
    });
  });
};

exports.updateSubscriber = (req, res) => {
  updateSubscriber(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Subscriber updated",
      data: results.rows[0],
    });
  });
};

exports.deleteSubscriber = (req, res) => {
  deleteSubscriber(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Subscriber deleted",
      data: results.rows[0],
    });
  });
};
