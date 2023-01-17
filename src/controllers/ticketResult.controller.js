const { errorHandler } = require("../helpers/errorHandler.helper");
const { readTicketResult } = require("../models/ticketResult.model");

exports.getTicketResult = (req, res) => {
  readTicketResult(req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      results: results.rows[0],
    });
  });
};
