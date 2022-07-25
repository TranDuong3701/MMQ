const Document = require("./../models/documentModel");
const catchAsync = require("../utils/catchAsync");
const fileUtils = require("../utils/fileUtils");
const pptxService = require("../services/pptxService");
const Segment = require("../models/segmentModel");

module.exports = {
  getAllDocuments: catchAsync(async (req, res, next) => {
    console.log(req.params);
    const filterQuery = {};
    if (req.params.projectId) {
      filterQuery.project = req.params.projectId;
    }

    const documents = await Document.find(filterQuery).lean();
    res.status(200).json({
      status: "success",
      data: documents,
    });
  }),
  getDocument: catchAsync(async (req, res, next) => {
    const document = await Document.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: document,
    });
  }),
  importDocument: catchAsync(async (req, res, next) => {
    // TODO: Prepare XML
    const { path, originalname } = req.file;
    const [filename, ext] = originalname.split(".");
    const { projectId: project } = req.params;

    const finalPath = `${path.split(".")[0]}.${ext}`;
    const document = await Document.create({
      filename,
      path: finalPath,
      project,
    });

    const xmlPath = await fileUtils.getXML(path);
    if (ext === "pptx") {
      await pptxService.handleImportPPTX(xmlPath, document._id);
    }

    if (ext === "docx") {
    }

    if (ext === "xlsx") {
    }

    const segments = await Segment.find({ document: document._id });
    await Document.findByIdAndUpdate(
      document._id,
      { size: segments.length },
      { runValidators: true, new: true }
    );

    // TODO: Zip => office file
    res.status(200).json({
      status: "success",
      data: document,
    });
  }),
  updateDocument: catchAsync(async () => {}),
  deleteDocument: catchAsync(async () => {}),
  exportDocument: catchAsync(async () => {}),
};
