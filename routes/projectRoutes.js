const express = require("express");

const projectController = require("./../controllers/projectController");
const authController = require("./../controllers/authController");
const documentRouter = require("./documentRoutes");

const router = express.Router();

router.use("/:projectId/documents", documentRouter);

router.use(authController.protect);
router.use(authController.restrictTo("PM"));
router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
