const path = require("path");
const multer = require("multer");

const storagePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.originalUrl === "/api/users/profile/upload-profile-photo") {
      cb(null, path.join(__dirname, "../public/images-profile"));
    } else {
      cb(null, path.join(__dirname, "../public/images-posts"));
    }
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    if (file) {
      if (req.originalUrl === "/api/users/profile/upload-profile-photo") {
        cb(null, req.user.id + fileName.substring(fileName.indexOf(".")));
      } else {
        cb(
          null,
          req.user.id +
            "-" +
            Math.floor(Math.random() * 1000) +
            file.originalname
        );
      }
    } else {
      cb(null, false);
    }
  },
});

const uploadPhoto = multer({
  storage: storagePhoto,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported File Format" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 },
});

module.exports = {
  uploadPhoto,
};
