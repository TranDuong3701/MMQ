const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    sourceLanguageCode: String,
    targetLanguageCode: String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
