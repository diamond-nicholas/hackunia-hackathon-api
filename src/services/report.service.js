const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Report } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");

const createReport = async (reportData, currentUser) => {
  const { type, description, location } = reportData;
  const report = await Report({
    type,
    description,
    createdBy: currentUser._id,
    location: {
      type: "Point",
      coordinates: location,
    },
  });
  return report;
};

module.exports = {
  createReport,
};
