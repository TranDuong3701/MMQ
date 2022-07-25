const Segment = require("./../models/segmentModel");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  getAllSegments: catchAsync(async (req, res, next) => {
    const filterQuery = {};
    if (req.params.documentId) {
      filterQuery.document = req.params.documentId;
    }
    const segments = await Segment.find(filterQuery).lean();

    res.status(200).json({
      status: "success",
      data: segments,
    });
  }),
  getSegment: catchAsync(async (req, res, next) => {
    const segment = await Segment.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: segment,
    });
  }),
  createSegment: catchAsync(async (req, res, next) => {
    const segment = await Segment.create(req.body);

    res.status(201).json({
      status: "success",
      data: segment,
    });
  }),
  updateSegment: catchAsync(async (req, res, next) => {
    const segment = await Segment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: segment,
    });
  }),
  deleteSegment: catchAsync(async () => {
    const segment = await Segment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: segment,
    });
  }),
};
