const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema(
  {
    source: String,
    target: String,
    status: {
      type: String,
      enum: ["submitted", "confirmed", "rejected"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Segment = mongoose.model("SegmentSchema", segmentSchema);

module.export = Segment;
