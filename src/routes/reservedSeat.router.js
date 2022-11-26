const {
  readAllReservedSeat,
  createReservedSeat,
  updateReservedSeat,
  deleteReservedSeat,
} = require("../controllers/reservedSeat.controller");

const reservedSeatRouter = require("express").Router();

reservedSeatRouter.get("/", readAllReservedSeat);
reservedSeatRouter.post("/", createReservedSeat);
reservedSeatRouter.patch("/:id", updateReservedSeat);
reservedSeatRouter.delete("/:id", deleteReservedSeat);

module.exports = reservedSeatRouter;
