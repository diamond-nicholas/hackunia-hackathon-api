const express = require("express");
const authRoute = require("./auth.route");
const resourceRoute = require("./resource.route");

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
