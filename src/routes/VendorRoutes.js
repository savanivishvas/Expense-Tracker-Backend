const routes = require("express").Router();
const vendorControllers = require("../controllers/VendorControllers");

routes.post("/addvendor",vendorControllers.addVendor);
routes.get("/getallvendors",vendorControllers.getAllVendor);

module.exports = routes;