const Project = require("./../models/projectModel");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  getAllProjects: catchAsync(async () => {}),
  getProject: catchAsync(async () => {}),
  createProject: catchAsync(async (req, res, next) => {
    const project = await Project.create(req.body);
    res.status(201).json({
      status: "success",
      data: project,
    });
  }),
  updateProject: catchAsync(async () => {}),
  deleteProject: catchAsync(async () => {}),
};
