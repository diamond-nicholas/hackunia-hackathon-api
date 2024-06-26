const express = require("express");
const authRoute = require("./auth.route");
const resourceRoute = require("./resource.route");
const reportRoute = require("./report.route");
const routePlanRoute = require("./routePlan.route");
const mapViewRoute = require("./mapview.route");
const chatRoute = require("./chat.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/resource",
    route: resourceRoute,
  },
  {
    path: "/report",
    route: reportRoute,
  },
  {
    path: "/route-plan",
    route: routePlanRoute,
  },
  {
    path: "/map-view",
    route: mapViewRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
