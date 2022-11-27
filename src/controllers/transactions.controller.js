const {
  readAllTransactions,
  readTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  readCountAllTransactions,
} = require("../models/transactions.model");

const { errorHandler } = require("../helpers/errorHandler.helper");
const filter = require("../helpers/filter.helper");

exports.readAllTransactions = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(
    req.query,
    sortable,
    readCountAllTransactions,
    res,
    (filter, pageInfo) => {
      readAllTransactions(filter, (error, results) => {
        if (error) {
          return errorHandler(error, res);
        }
        return res.status(200).json({
          success: true,
          message: "List all transactions",
          pageInfo,
          data: results.rows,
        });
      });
    }
  );
};

exports.readTransaction = (req, res) => {
  readTransaction(req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createTransaction = (req, res) => {
  createTransaction(req.body, (error, results) => {
    if (error) {
      errorHandler(error, res);
    } else {
      return res.status(200).json({
        success: true,
        message: "Transaction added",
        data: results.rows[0],
      });
    }
  });
};

exports.updateTransaction = (req, res) => {
  updateTransaction(req.body, req.params.id, (error, results) => {
    console.log(results);
    if (error) {
      console.log(error);
      return errorHandler(error, res);
    }

    // if (results.rowCount <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Failed to update, Transaction not found",
    //   });
    // } else {
    return res.status(200).json({
      success: true,
      message: "Transaction updated",
      data: results.rows[0],
    });
    // }
  });
};

exports.deleteTransaction = (req, res) => {
  deleteTransaction(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    // if (results.rowCount <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Failed to delete, Transaction not found",
    //   });
    // } else {
    return res.status(200).json({
      success: true,
      message: "Transaction deleted",
      data: results.rows[0],
    });
    // }
  });
};
