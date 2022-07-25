const fs = require("fs");
const unzipper = require("unzipper");
const { promisify } = require("util");
const xml2js = require("xml2js");

module.exports = {
  overrideXml: async (path, data) => {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(data);
    await promisify(fs.writeFile)(path, xml);
  },
  getFiles: async (xmlPath, ext) => {
    let result = {};
    if (ext === "pptx") {
      result.dir = `${xmlPath}/ppt/slides`;
      const files = await promisify(fs.readdir)(result.dir);
      result.files = files.filter((file) => file.includes("slide"));
    }
    return result;
  },
  getXML: async (path) => {
    const [xmlPath] = path.split(".");
    if (!fs.existsSync(xmlPath)) {
      await promisify(fs.mkdir)(xmlPath, { recursive: true });
    }

    await fs
      .createReadStream(path)
      .pipe(unzipper.Extract({ path: xmlPath }))
      .promise();

    await promisify(fs.unlink)(path);

    return xmlPath;
  },

  xmlToJson: async (filePath) => {
    let xmlData = await promisify(fs.readFile)(filePath, "utf-8");
    const data = await xml2js.parseStringPromise(xmlData, {
      explicitArray: false,
      attrkey: "_attribute",
    });

    return data;
  },
};
