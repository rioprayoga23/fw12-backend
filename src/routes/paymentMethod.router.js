const {
  readAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentMethod.controller");

const paymentRouter = require("express").Router();

paymentRouter.get("/", readAllPayments);
paymentRouter.post("/", createPayment);
paymentRouter.patch("/:id", updatePayment);
paymentRouter.delete("/:id", deletePayment);

module.exports = paymentRouter;
