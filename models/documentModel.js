const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    filename: String,
    version: { type: Number, default: 1.0 },
    size: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    path: String,
    translator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
