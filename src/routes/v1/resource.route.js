const express = require("express");
const validate = require("../../middlewares/validate");
const { resourceValidation } = require("../../validations");
const { resourceController } = require("../../controllers");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(resourceValidation.createResource),
  resourceController.createResource
);

router.get(
  "/",
  isAuthenticated,
  validate(resourceValidation.getResources),
  resourceController.getResources
);

module.exports = router;
