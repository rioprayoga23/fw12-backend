const {
  readAllCasts,
  createCast,
  updateCast,
  deleteCast,
  readCountAllCast,
} = require("../models/casts.model");

const { errorHandler } = require("../helpers/errorHandler.helper");
const filter = require("../helpers/filter.helper");

exports.readAllCasts = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortable, readCountAllCast, res, (filter, pageInfo) => {
    readAllCasts(filter, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      return res.status(200).json({
        success: true,
        message: "List all casts",
        pageInfo,
        data: results.rows,
      });
    });
  });
};

exports.createCast = (req, res) => {
  createCast(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      data: results.rows[0],
    });
  });
};

exports.updateCast = (req, res) => {
  updateCast(req.body, req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Cast updated successfully",
      data: results.rows[0],
    });
  });
};

exports.deleteCast = (req, res) => {
  deleteCast(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Delete Cast successfully",
      data: results.rows[0],
    });
  });
};
