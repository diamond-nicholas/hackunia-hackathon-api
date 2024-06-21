const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const {
  authService,
  tokenService,
  userService,
  reportService,
} = require("../services");
const pick = require("../utils/pick");

const createReport = catchAsync(async (req, res) => {
  try {
    const resource = await reportService.createReport(req.body, req.user);
    res.status(httpStatus.CREATED).send({
      message: "Report sent for approval",
      data: resource,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

module.exports = {
  createReport,
};
