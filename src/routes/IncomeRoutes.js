const routes = require("express").Router();
const incomeControllers = require("../controllers/IncomeControllers");

routes.post("/addincome",incomeControllers.addIncome);
routes.get("/getallincome",incomeControllers.getAllIncome);
routes.delete("/deleteincome/:id",incomeControllers.deleteIncome);
routes.patch("/updateincome/:id",incomeControllers.updateIncome);
routes.get("/last30dayincome",incomeControllers.last30daysincome);

module.exports = routes;