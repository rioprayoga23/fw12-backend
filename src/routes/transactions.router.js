const {
  readAllTransactions,
  readTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.controller");

const transactionRouter = require("express").Router();

transactionRouter.get("/", readAllTransactions);
transactionRouter.get("/:id", readTransaction);
transactionRouter.post("/", createTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

module.exports = transactionRouter;
