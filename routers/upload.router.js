// const express = require("express");
// const UploadController = require("../controllers/upload.controller");
// const cloudinary = require("../config/cloundinary");
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "MYSTERYBOX",
//   public_id: (req, file) => file.filename,
//   allowedFormats: ["jpg", "png", "jpeg"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }],
// });
// const upload = multer({
//   storage: storage,
// });
// const router = express.Router();

// router.post(
//   "/upload-image",
//   upload.single("image"),
//   UploadController.uploadImage
// );

// router.post(
//   "/upload-images",
//   upload.array("images", 10),
//   UploadController.uploadImages
// );

// module.exports = router;
