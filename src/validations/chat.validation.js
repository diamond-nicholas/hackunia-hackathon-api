const Joi = require("joi");

const createChat = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    isGroupChat: Joi.boolean().required(),
    members: Joi.array().items().required(),
  }),
};

const getAllMyChat = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({}),
};

module.exports = {
  createChat,
  getAllMyChat,
};
