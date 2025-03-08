const routes = require("express").Router();
const subcategoryControllers = require("../controllers/SubcategoryControllers");

routes.post("/addsubcategory",subcategoryControllers.addsubcategory);
routes.get("/getsubcategorybycategory/:categoryId",subcategoryControllers.getSubcategoriesByCategoryId)

module.exports = routes;


