const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: String,
    version: Number,
    extension: String,
    size: Number,
    path: String,
    translator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.export = Document;
