const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Report } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");

const createReport = async (reportData, currentUser) => {
  const { type, description, location } = reportData;
  const report = await Report.create({
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

const updateReports = async (reportBody, currentUser) => {
  const { reportId, reportStatus } = reportBody;
  console.log(reportId);
  const report = await Report.findOne({ _id: reportId });
  if (!report) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Report not found");
  }
  //only admin can update this
  report.status = reportStatus;
  await report.save();
  return report;
};

const getReports = async (currentUser) => {
  const report = await Report.find({});
  return report;
};

module.exports = {
  createReport,
  getReports,
  updateReports,
};
