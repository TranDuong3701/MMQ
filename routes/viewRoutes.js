const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

const viewController = require("../controllers/viewController");

router.use(authController.isLoggedIn);

router.get("/admin", viewController.getDashboard);
router.get("/login", viewController.getLogin);
router.get("/admin/users", viewController.getUsers);
router.get("/admin/projects", viewController.getProjects);

module.exports = router;
