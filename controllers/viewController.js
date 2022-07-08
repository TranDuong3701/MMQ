const catchAsync = require("../utils/catchAsync");
const Project = require("./../models/projectModel");

module.exports = {
  getDashboard: catchAsync(async (req, res, next) => {
    res.render("dashboard.ejs");
  }),
  getLogin: catchAsync(async (req, res, next) => {
    res.render("login.ejs");
  }),
  getHome: catchAsync(async (req, res, next) => {
    res.render("index.ejs");
  }),
  getUsers: catchAsync(async (req, res, next) => {
    res.render("users.ejs");
  }),
  getProjects: catchAsync(async (req, res, next) => {
    const projects = await Project.find();
    res.render("projects.ejs", { projects });
  }),
};
