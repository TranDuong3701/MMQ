const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema(
  {
    source: String,
    target: String,
    document: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Document",
      required: true,
    },
    status: {
      type: String,
      enum: ["unsubmit", "submitted", "confirmed", "rejected"],
      default: "unsubmit",
    },
  },
  {
    timestamps: true,
  }
);

const Segment = mongoose.model("SegmentSchema", segmentSchema);

module.exports = Segment;
