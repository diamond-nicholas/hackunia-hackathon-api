const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["alien_sighting", "safe_zone", "resource_status"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  status: {
    type: String,
    enum: ["pending", "verified", "dismissed"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
