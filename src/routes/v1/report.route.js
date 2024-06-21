const express = require("express");
const validate = require("../../middlewares/validate");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { reportValidation } = require("../../validations");
const { reportController } = require("../../controllers");
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(reportValidation.createReport),
  reportController.createReport
);

module.exports = router;
