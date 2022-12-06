const { errorHandler } = require("../helpers/errorHandler.helper");
const filter = require("../helpers/filter.helper");
const {
  readAllMovies,
  createMovie,
  readMovie,
  deleteMovie,
  updateMovie,
  readCountAllMovies,
  nowShowing,
  upComing,
  countNowShowing,
  countUpComing,
} = require("../models/movies.model");

const fs = require("fs");
const fm = require("fs-extra");

exports.readAllMovies = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortable, readCountAllMovies, res, (filter, pageInfo) => {
    readAllMovies(filter, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      return res.status(200).json({
        success: true,
        message: "List all movies",
        pageInfo,
        results: results.rows,
      });
    });
  });
};

exports.createMovie = (req, res) => {
  req.body.picture = req.file.filename;
  createMovie(req.body, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Create movie success",
      results: results.rows[0],
    });
  });
};

exports.readMovie = (req, res) => {
  readMovie(req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: `Detail Movie ${req.params.id}`,
      results: results.rows[0],
    });
  });
};

exports.updateMovie = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename;
    readMovie(req.params.id, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      if (results.rows.length) {
        const [user] = results.rows;
        fm.ensureFile(`uploads/${user.picture}`, (error) => {
          if (error) {
            return errorHandler(error, res);
          }
          fs.rm(`uploads/${user.picture}`, (error) => {
            if (error) {
              return errorHandler(error, res);
            }
          });
        });
      }
    });
  }

  updateMovie(req.body, req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie updated",
      results: results.rows[0],
    });
  });
};

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Delete Movie successfully",
      results: results.rows[0],
    });
  });
};

exports.nowShowing = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortable, countNowShowing, res, (filter, pageInfo) => {
    nowShowing(filter, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      return res.status(200).json({
        success: true,
        message: "List Now Showing",
        pageInfo,
        results: results.rows,
      });
    });
  });
};

exports.upComing = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortable, countUpComing, res, (filter, pageInfo) => {
    upComing(filter, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      return res.status(200).json({
        success: true,
        message: "Upcoming Now showing",
        pageInfo,
        results: results.rows,
      });
    });
  });
};
