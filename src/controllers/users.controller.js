const {
  readAllUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser,
  readCountAllUsers,
} = require("../models/users.model");

const { errorHandler } = require("../helpers/errorHandler.helper");
const filter = require("../helpers/filter.helper");

exports.readAllUsers = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortable, readCountAllUsers, res, (filter, pageInfo) => {
    readAllUsers(filter, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      return res.status(200).json({
        success: true,
        message: "List all users",
        pageInfo,
        data: results.rows,
      });
    });
  });
};

exports.readUser = (req, res) => {
  readUser(req, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.createUser = (req, res) => {
  createUser(req.body, (error, results) => {
    if (error) {
      errorHandler(error, res);
    } else {
      return res.status(200).json({
        success: true,
        message: "User added",
        data: results.rows[0],
      });
    }
  });
};

exports.updateUser = (req, res) => {
  updateUser(req.body, req.params.id, (error, results) => {
    console.log(results);
    if (error) {
      return errorHandler(error, res);
    }

    // if (results.rowCount <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Failed to update, user not found",
    //   });
    // } else {
    return res.status(200).json({
      success: true,
      message: "User updated",
      data: results.rows[0],
    });
    // }
  });
};

exports.deleteUser = (req, res) => {
  deleteUser(req.params.id, (error, results) => {
    if (error) {
      errorHandler(error, res);
    }
    // if (results.rowCount <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Failed to delete, user not found",
    //   });
    // } else {
    return res.status(200).json({
      success: true,
      message: "User deleted",
      data: results.rows[0],
    });
    // }
  });
};
