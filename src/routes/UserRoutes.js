const routes = require("express").Router();
const userControllers = require("../controllers/UserControllers");
const adminControllers = require("../controllers/AdminControllers");

// user routes
routes.post("/user/userlogin",userControllers.loginUser);
routes.post("/user/usersignup",userControllers.signupUser);
routes.get("/user/users",userControllers.getAllUser);
routes.get("/user/users/:id",userControllers.getUserById);
routes.patch("/user/updateuser/:id",userControllers.updateUserById);
routes.delete("/user/users/:id",userControllers.deleteUser);
routes.post("/user/forgotpassword",userControllers.forgotpassword);
routes.post("/user/resetpassword",userControllers.resentpassword);

// admin routes
routes.post("/admin/adminsignup",adminControllers.signupAdmin);

module.exports = routes;