const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cover") {
      cb(null, "uploads/produk/cover");
    } else if (file.fieldname === "file") {
      cb(null, "uploads/produk/file");
    } else {
      cb(null, "uploads/produk");
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}${path.extname(file.originalname)}`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "cover") {
    const allowedImages = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowedImages.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Cover hanya boleh JPG, PNG, atau WEBP"), false);
  }

  if (file.fieldname === "file") {
    const allowedFiles = [
      "application/pdf",

      "application/msword",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      "application/vnd.ms-excel",

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowedFiles.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("File harus PDF, DOC, DOCX, XLS, atau XLSX"), false);
  }

  cb(null, false);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
