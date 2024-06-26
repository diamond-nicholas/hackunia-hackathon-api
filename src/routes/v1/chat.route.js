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

router.patch(
  "/",
  isAuthenticated,
  validate(chatValidation.addUserToChat),
  chatController.addUserToChat
);

router.get(
  "/:chatId/messages",
  isAuthenticated,
  validate(chatValidation.getMessages),
  chatController.getMessages
);

module.exports = router;
