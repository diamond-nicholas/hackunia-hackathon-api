const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Resource, Report } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");

const getMapView = async () => {
  try {
    const reports = await Report.find({ status: "verified" });
    const resources = await Resource.find({});
    const mapViewData = {
      reports: reports.map((report) => ({
        id: report._id,
        type: report.type,
        location: {
          type: report.location.type,
          coordinates: report.location.coordinates,
        },
        createdAt: report.createdAt,
        status: report.status,
        description: report.description,
      })),
      resources: resources.map((resource) => ({
        id: resource._id,
        type: resource.type,
        location: {
          type: resource.location.type,
          coordinates: resource.location.coordinates,
        },
        name: resource.name,
        availability: resource.availability,
      })),
    };

    return mapViewData;
  } catch (error) {
    console.error("Error fetching map view data:", error);
    throw error;
  }
};

module.exports = {
  getMapView,
};
