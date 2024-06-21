const Joi = require("joi");

const setRoutePlan = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    destinationType: Joi.string().required(),
    currentLocation: Joi.array().items(Joi.number()).length(2).required(),
  }),
};

module.exports = {
  setRoutePlan,
};
