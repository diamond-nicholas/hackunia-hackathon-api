const express = require("express");
const validate = require("../../middlewares/validate");
const { routePlanValidation } = require("../../validations");
const { routePlanController } = require("../../controllers");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(routePlanValidation.setRoutePlan),
  routePlanController.setRoutePlan
);

module.exports = router;
