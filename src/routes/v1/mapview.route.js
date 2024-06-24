const express = require("express");
const validate = require("../../middlewares/validate");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { reportValidation } = require("../../validations");
const { reportController, mapViewController } = require("../../controllers");
const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  // validate(reportValidation.createReport),
  mapViewController.getMapView
);

module.exports = router;
