const routes = require("express").Router();
const accountControollers = require("../controllers/AccountControllers");

routes.post("/addaccount",accountControollers.createAccount);
routes.get("/:id",accountControollers.getAccountById);

module.exports= routes;