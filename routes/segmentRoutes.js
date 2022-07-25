const express = require("express");
const authController = require("../controllers/authController");
const segmentController = require("./../controllers/segmentController");

const router = express.Router({
  mergeParams: true,
});

router.use(authController.protect);

router
  .route("/")
  .get(segmentController.getAllSegments)
  .post(segmentController.createSegment);

router
  .route("/:id")
  .get(segmentController.getSegment)
  .patch(segmentController.updateSegment)
  .delete(segmentController.deleteSegment);

module.exports = router;
