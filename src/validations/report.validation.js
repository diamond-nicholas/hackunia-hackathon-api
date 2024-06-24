const Joi = require("joi");

const createReport = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    type: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.array().items(Joi.number()).length(2).required(),
  }),
};

const getReport = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({}),
};

const updateReports = {
  headers: Joi.object({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    reportId: Joi.string().required(),
    reportStatus: Joi.string().required(),
  }),
};

module.exports = {
  createReport,
  getReport,
  updateReports,
};
