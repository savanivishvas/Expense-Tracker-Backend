const routes = require("express").Router();
const categoryControllers = require("../controllers/CategoryControllers");

routes.post("/addcategory",categoryControllers.addCategory);
routes.get("/getallcategories",categoryControllers.getAllCategories);

module.exports = routes;