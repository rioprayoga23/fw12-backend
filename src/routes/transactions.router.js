const {
  readAllTransactions,
  readTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  createOrder,
  historyOrder,
} = require("../controllers/transactions.controller");

const transactionRouter = require("express").Router();

transactionRouter.get("/", readAllTransactions);
transactionRouter.get("/history", historyOrder);
transactionRouter.get("/:id", readTransaction);
transactionRouter.post("/", createTransaction);
transactionRouter.post("/createOrder", createOrder);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

module.exports = transactionRouter;
