const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Resource } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");

const createResource = async (resourceData, currentUser) => {
  const resource = await Resource.create({
    name: resourceData.name,
    type: resourceData.type,
    location: {
      type: "Point",
      coordinates: resourceData.coordinates,
    },
    availability: resourceData.availability,
    createdBy: currentUser._id,
  });
  return resource;
};

const getResources = async (currentUser) => {
  const resource = await Resource.find({});
  return resource;
};

module.exports = {
  createResource,
  getResources,
};
