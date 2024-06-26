const express = require("express");
const validate = require("../../middlewares/validate");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { chatValidation } = require("../../validations");
const { chatController } = require("../../controllers");
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  validate(chatValidation.createChat),
  chatController.createChat
);

router.get(
  "/",
  isAuthenticated,
  validate(chatValidation.getAllMyChat),
  chatController.getAllMyChat
);

module.exports = router;
