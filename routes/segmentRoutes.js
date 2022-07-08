const express = require("express");
const segmentController = require("./../controllers/segmentController");
const router = express.Router();

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
