const routes = require("express").Router();
const categoryControllers = require("../controllers/CategoryControllers");

routes.post("/addcategory",categoryControllers.addCategory);
routes.get("/getallcategories",categoryControllers.getAllCategories);
routes.get("/getbycategory/:category",categoryControllers.getIncomeByCategory);
routes.get("/getallexpensecategories",categoryControllers.getAllExpenseCategories);
routes.get("/getbyexpensecategory/:category",categoryControllers.getExpenseByCategory);
routes.get("/getallexpensebycategory",categoryControllers.getAllExpenseCategoriesWithSum);
routes.get("/getallincomebycategory",categoryControllers.getAllIncomeCategoriesWithSum);

module.exports = routes;