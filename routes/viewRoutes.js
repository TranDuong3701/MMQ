const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const viewController = require("../controllers/viewController");

router.use(authController.isLoggedIn);

router.get("/", viewController.getDashboard);
router.get("/login", viewController.getLogin);
router.get("/users", viewController.getUsers);
router.get("/projects", viewController.getProjects);
router.get("/projects/:id", viewController.getProject);
router.get("/documents/:id", viewController.getDocument);

module.exports = router;
