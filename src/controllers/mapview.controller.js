const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const { mapViewService } = require("../services");
const pick = require("../utils/pick");

const getMapView = catchAsync(async (req, res) => {
  try {
    const mapView = await mapViewService.getMapView();
    res.status(httpStatus.OK).send({
      message: "",
      data: mapView,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

module.exports = {
  getMapView,
};
