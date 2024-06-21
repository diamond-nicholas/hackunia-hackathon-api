const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const {
  authService,
  tokenService,
  userService,
  resourceService,
} = require("../services");
const pick = require("../utils/pick");

const createResource = catchAsync(async (req, res) => {
  const resourceBody = { ...req.body };
  try {
    const resource = await resourceService.createResource(
      resourceBody,
      req.user
    );
    res.status(httpStatus.CREATED).send({
      message: "Resource added",
      data: "",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

const getResources = catchAsync(async (req, res) => {
  try {
    const resource = await resourceService.getResources(req.user);
    res.status(httpStatus.CREATED).send({
      message: "",
      data: resource,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

module.exports = {
  createResource,
  getResources,
};
