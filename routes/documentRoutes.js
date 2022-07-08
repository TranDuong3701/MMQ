const express = require("express");
const documentController = require("./../controllers/documentController");
const router = express.Router();

router
  .route("/")
  .get(documentController.getAllDocuments)
  .post(documentController.createDocument);

router
  .route("/:id")
  .get(documentController.getDocument)
  .patch(documentController.updateDocument)
  .delete(documentController.deleteDocument);

module.exports = router;