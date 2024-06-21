const mongoose = require("mongoose");
const { Schema } = mongoose;

const routeSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Resource",
      required: true,
    },
    currentLocation: {
      type: [Number],
      required: true,
    },
    route: {
      type: [String],
      required: true,
    },
    distanceInKm: {
      type: Number,
      required: true,
    },
    timeInHours: {
      type: Number,
      required: true,
    },
    alienSightingsAvoided: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
