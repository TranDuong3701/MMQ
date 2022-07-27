const Project = require("./../models/projectModel");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  getAllProjects: catchAsync(async (req, res, next) => {
    const projects = await Project.find({
      users: req.user._id,
    }).lean();

    res.status(200).json({
      status: "sucess",
      data: projects,
    });
  }),
  getProject: catchAsync(async (req, res, next) => {
    const project = await Project.findById(req.params.id).populate("users");

    res.status(200).json({
      status: "sucess",
      data: project,
    });
  }),
  createProject: catchAsync(async (req, res, next) => {
    const data = { ...req.body, users: [] };
    data.users.push(req.user._id);
    const project = await Project.create(data);

    res.status(201).json({
      status: "success",
      data: project,
    });
  }),
  deleteProject: catchAsync(async (req, res, next) => {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  }),
  updateProject: catchAsync(async (req, res, next) => {
    const { users } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { users },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "sucess",
      data: project,
    });
  }),
};
