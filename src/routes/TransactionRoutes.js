const route = require("express").Router();
const transactionController = require("../controllers/TransactionControllers");

// Route to get recent transactions (last 5 income + last 5 expenses)
route.get("/recenttransactions", transactionController.getRecentTransactions);

module.exports = route;
