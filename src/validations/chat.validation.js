const Joi = require("joi");

const createChat = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    members: Joi.array().items().required(),
  }),
};

const getAllMyChat = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({}),
};

const addUserToChat = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    chatId: Joi.string().required(),
    userToBeAddedId: Joi.string().required(),
  }),
};

const getMessages = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
};

module.exports = {
  createChat,
  getAllMyChat,
  addUserToChat,
  getMessages,
};
