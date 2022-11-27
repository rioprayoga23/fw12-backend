const {
  readAllCasts,
  createCast,
  updateCast,
  deleteCast,
  readCountAllCast,
} = require("../models/casts.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

exports.readAllCasts = (req, res) => {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.limit = parseInt(req.query.limit) || 5;
  req.query.search = req.query.search || "";
  const sortable = ["name", "createdAt", "updatedAt"];
  req.query.sortBy =
    (sortable.includes(req.query.sortBy) && req.query.sortBy) || "createdAt";
  req.query.sort = req.query.sort || "ASC";

  const filter = {
    limit: req.query.limit,
    offset: (parseInt(req.query.page) - 1) * req.query.limit,
    search: req.query.search,
    sortBy: req.query.sortBy,
    sort: req.query.sort,
  };

  const pageInfo = {
    page: req.query.page,
  };
  readCountAllCast(filter, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    pageInfo.totalData = results.rows[0].totalData;
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit);
    pageInfo.nextPage =
      req.query.page < pageInfo.totalPage ? req.query.page + 1 : null;
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1 : null;

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
      message: results.rows[0],
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
