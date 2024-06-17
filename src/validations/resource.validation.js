const Joi = require("joi");

const createResource = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    // location: Joi.object()
    //   .keys({
    //     type: Joi.string().valid("Point").required(),
    //     coordinates: Joi.array().items(Joi.number()).length(2).required(),
    //   })
    //   .required(),
    availability: Joi.string().required(),
  }),
};

const getResources = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({}),
};

module.exports = {
  createResource,
  getResources,
};
