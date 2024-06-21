const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Resource, Report, RoutePlan } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");
const { dijkstra } = require("../config/dijkstra");

const getDistance = (loc1, loc2) => {
  // Calculate distance between two coordinates
  const [lon1, lat1] = loc1;
  const [lon2, lat2] = loc2;
  const R = 6371e3;
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const getRoute = (previous, destination) => {
  let route = [];
  let current = destination;
  while (current) {
    route.push(current);
    current = previous[current];
  }
  return route.reverse();
};

const setRoute = async (routeBody, currentUser) => {
  const { currentLocation, destinationType } = routeBody;
  try {
    const resources = await Resource.find({
      type: destinationType,
      availability: "available",
    });
    const reports = await Report.find({
      type: "alien_sighting",
      // status: "verified",
    });

    let graph = {
      nodes: [],
      edges: {},
    };

    resources.forEach((resource) => {
      graph.nodes.push(resource._id.toString());
      graph.edges[resource._id.toString()] = [];
    });

    const userNodeId = currentUser._id;
    graph.nodes.push(userNodeId);
    graph.edges[userNodeId] = resources.map((resource) => ({
      node: resource._id.toString(),
      weight: getDistance(currentLocation, resource.location.coordinates),
    }));

    // Add edges with weights influenced by alien sightings
    let alienSightingsAvoided = 0;
    reports.forEach((report) => {
      const reportLocation = {
        latitude: report.location.coordinates[1],
        longitude: report.location.coordinates[0],
      };
      resources.forEach((resource) => {
        const resourceLocation = {
          latitude: resource.location.coordinates[1],
          longitude: resource.location.coordinates[0],
        };
        const distance = getDistance(reportLocation, resourceLocation);

        // Increase weight if near alien sightings
        const weight = distance < 1000 ? distance * 10 : distance;
        graph.edges[resource._id.toString()].push({
          node: resource._id.toString(),
          weight: weight,
        });

        // Count how many alien sightings are near the resource
        if (weight > distance) {
          alienSightingsAvoided++;
        }
      });
    });

    // Apply Dijkstra's algorithm
    const { distances, previous } = dijkstra(graph, userNodeId);

    // Find the nearest resource
    let nearestResource = null;
    let minDistance = Infinity;
    for (let resource of resources) {
      if (distances[resource._id.toString()] < minDistance) {
        minDistance = distances[resource._id.toString()];
        nearestResource = resource;
      }
    }

    const minDistanceInKm = minDistance / 1000;

    const walkingSpeedKmPerHour = 5;
    const durationInHr = minDistanceInKm / walkingSpeedKmPerHour;

    if (nearestResource) {
      const newRoute = await RoutePlan.create({
        user: currentUser._id,
        destination: nearestResource._id,
        currentLocation,
        route: getRoute(previous, nearestResource._id.toString()),
        distanceInKm: minDistanceInKm,
        timeInHours: durationInHr,
        alienSightingsAvoided,
      });
      return {
        route: getRoute(previous, nearestResource._id.toString()),
        distanceInKm: minDistanceInKm,
        destination: nearestResource,
        timeInHours: durationInHr,
        currentLocation: currentLocation,
        alienSightingsAvoided: alienSightingsAvoided,
        _id: newRoute._id,
      };
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "No available resources found"
      );
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  setRoute,
};
