const routes = require("express").Router();
const expenseControllers = require("../controllers/ExpenseControllers");

routes.post("/addexpense",expenseControllers.addExpense);
routes.get("/getallexpense",expenseControllers.getAllExpense);
routes.delete("/deleteexpense/:id",expenseControllers.deleteExpenceById);
routes.patch("/updateexpense/:id",expenseControllers.updateExpense);
routes.get("/getexpensebyuserid/:userId",expenseControllers.getExpenseByUserId);

module.exports = routes;