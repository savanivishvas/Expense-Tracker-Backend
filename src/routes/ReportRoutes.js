const route = require("express").Router();
const reportControllers = require("../controllers/ReportControllers");

route.get("/daywisereport",reportControllers.DayWiseReport);
route.get("/weekwisereport",reportControllers.WeekWiseReport);
route.get("/monthwisereport",reportControllers.MonthWiseReport);
route.get("/yearwisereport",reportControllers.YearWiseReport);

module.exports = route;