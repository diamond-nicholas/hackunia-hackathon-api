// exports.routePlanning = (socket) => {
//   socket.on("route-planning", (data) => {
//     // Process route planning data and emit updates
//     socket.emit("route-update", {
//       message: "Route planning data received",
//       data,
//     });
//   });
// };

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const {
  authService,
  tokenService,
  userService,
  routePlan,
} = require("../services");
const pick = require("../utils/pick");

const setRoutePlan = catchAsync(async (req, res) => {
  try {
    const route = await routePlan.setRoute(req.body, req.user);
    res.status(httpStatus.CREATED).send({
      message: "route set",
      data: route,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

module.exports = {
  setRoutePlan,
};
