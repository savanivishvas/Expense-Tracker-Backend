const routes =  require("express").Router();
const adminControllers = require("../controllers/AdminControllers");

routes.post("/admin/adminlogin",adminControllers.loginAdmin);
routes.post("/admin/adminsignup",adminControllers.signupAdmin);
routes.get("/admin/admins",adminControllers.getAllAdmin);
routes.get("/admin/admins/:id",adminControllers.getAdminbyId);
routes.delete("/admin/deleteadmin/:id",adminControllers.deleteAdmin);
routes.patch("/admin/updateadmin/:id",adminControllers.updateAdmin);
routes.post("/admin/addadmin",adminControllers.addAdmin);

module.exports = routes;