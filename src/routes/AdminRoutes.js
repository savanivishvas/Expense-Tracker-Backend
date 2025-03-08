const routes =  require("express").Router();
const adminControllers = require("../controllers/AdminControllers");

routes.post("/admin/adminlogin",adminControllers.loginAdmin);
routes.post("/admin/adminsignup",adminControllers.signupAdmin);
routes.get("/admin/admins",adminControllers.getAllAdmin);
routes.get("/admin/admins/:id",adminControllers.getAdminbyId);
routes.delete("/admin/admins/:id",adminControllers.deleteAdmin);

module.exports = routes;