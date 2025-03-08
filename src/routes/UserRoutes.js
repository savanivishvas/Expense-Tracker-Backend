const routes = require("express").Router();
const userControllers = require("../controllers/UserControllers");
const adminControllers = require("../controllers/AdminControllers");

// user routes
routes.post("/user/userlogin",userControllers.loginUser);
routes.post("/user/usersignup",userControllers.signupUser);
routes.get("/user/users",userControllers.getAllUser);
routes.get("/user/users/:id",userControllers.getUserById);
routes.delete("/user/users/:id",userControllers.deleteUser);

// admin routes
routes.post("/admin/adminsignup",adminControllers.signupAdmin);

module.exports = routes;