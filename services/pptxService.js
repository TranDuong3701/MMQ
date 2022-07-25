const fileUtils = require("../utils/fileUtils");
const Segment = require("./../models/segmentModel");
const path = require("path");

module.exports = {
  async handleUpdateSegment(xmlPath, segment) {
    const { files, dir } = await fileUtils.getFiles(xmlPath, "pptx");

    for (let i = 1; i <= files.length; i++) {
      const slide = `slide${i}.xml`;
      const slidePath = path.join(dir, "/", slide);
      const data = await fileUtils.xmlToJson(slidePath);

      const shapes = data["p:sld"]["p:cSld"]["p:spTree"]["p:sp"];
      if (shapes) {
        this.updateSegmentInShapes(shapes, segment);
      }
      fileUtils.overrideXml(slidePath, data);
    }
  },

  async handleImportPPTX(xmlPath, document) {
    const { files, dir } = await fileUtils.getFiles(xmlPath, "pptx");

    for (let i = 1; i <= files.length; i++) {
      const slide = `slide${i}.xml`;
      const slidePath = path.join(dir, "/", slide);
      const data = await fileUtils.xmlToJson(slidePath);

      const shapes = data["p:sld"]["p:cSld"]["p:spTree"]["p:sp"];
      if (shapes) {
        await this.getSegmentInShapes(shapes, document);
      }

      fileUtils.overrideXml(slidePath, data);
    }
  },

  async getSegmentInShapes(shapes, document) {
    for (let i = 0; i < shapes.length; i++) {
      const paragraph = shapes[i]["p:txBody"]["a:p"];
      let rows = paragraph["a:r"];
      rows = Array.isArray(rows) ? rows : [rows];

      for (let j = 0; j < rows.length; j++) {
        const source = rows[j]["a:t"];
        const segment = await Segment.create({
          source,
          document,
        });

        if (segment) {
          rows[j]["a:rPr"]._attribute.key = segment._id.toString();
        }
      }
    }
  },

  updateSegmentInShapes(shapes, segment) {
    for (let i = 0; i < shapes.length; i++) {
      const paragraph = shapes[i]["p:txBody"]["a:p"];
      let rows = paragraph["a:r"];
      rows = Array.isArray(rows) ? rows : [rows];

      for (let j = 0; j < rows.length; j++) {
        if ((rows[j]["a:rPr"]._attribute.key = segment._id.toString())) {
          rows[j]["a:t"] = segment.target;
        }
      }
    }
  },
};
