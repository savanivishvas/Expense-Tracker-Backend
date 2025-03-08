const routes = require("express").Router();
const roleControllers = require("../controllers/RoleControllers");

routes.post("/addrole",roleControllers.addRole);
routes.get("/allroles",roleControllers.getallroles);
routes.get("/:id",roleControllers.getRoleById);
routes.delete("/:id",roleControllers.deleteRole);

module.exports = routes;