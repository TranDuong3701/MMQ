const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const [name, ext] = file.originalname.split(".");
    cb(null, name + ".zip");
  },
});

const upload = multer({ storage });

module.exports = upload;
