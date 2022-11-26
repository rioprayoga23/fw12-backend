const {
  readAllSubscribers,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber,
} = require("../controllers/subscribers.controller");

const subscribersRouter = require("express").Router();

subscribersRouter.get("/", readAllSubscribers);
subscribersRouter.post("/", createSubscriber);
subscribersRouter.patch("/:id", updateSubscriber);
subscribersRouter.delete("/:id", deleteSubscriber);

module.exports = subscribersRouter;
