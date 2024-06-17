const mongoose = require("mongoose");

const ResourceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["hospital", "food", "shelter"],
    required: true,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  availability: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

ResourceSchema.index({ location: "2dsphere" }); // Index for geospatial queries

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;
