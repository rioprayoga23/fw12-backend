const { getTicketResult } = require("../controllers/ticketResult.controller");

const ticketResultRouter = require("express").Router();

ticketResultRouter.get("/:id", getTicketResult);

module.exports = ticketResultRouter;
