const routes = require("express").Router();
const balanceControllers = require("../controllers/BalanceController");

routes.get("/getbalance",balanceControllers.getBalance);

module.exports = routes;