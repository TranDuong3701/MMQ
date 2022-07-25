const express = require("express");
const documentController = require("./../controllers/documentController");
const router = express.Router({ mergeParams: true });
const segmentRouter = require("./segmentRoutes");

const upload = require("./../config/multer");

router.use("/:documentId/segments", segmentRouter);

router
  .route("/")
  .get(documentController.getAllDocuments)
  .post(upload.single("file"), documentController.importDocument);

router
  .route("/:id")
  .get(documentController.getDocument)
  .patch(documentController.updateDocument)
  .delete(documentController.deleteDocument);

module.exports = router;
