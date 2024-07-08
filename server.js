const express = require("express");
const connectDatabase = require("./config/connectDatabase");
const initRouter = require("./routers/index");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("./config/cloundinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const app = express();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "MYSTERYBOX",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});
const upload = multer({
  storage: storage,
});
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDatabase();
initRouter(app);
app.post(
  "/upload-image",
  upload.fields([{ name: "img", maxCount: 1 }]),
  (req, res) => {
    try {
      const link_img = req.files["img"][0];
      res.send(link_img);
    } catch (error) {
      console.log(error);
    }
  }
);
app.post("/upload-images", upload.array("images", 10), (req, res) => {
  try {
    const files = req.files;
    const fileLinks = files.map((file) => file.path);
    res.send({ files: fileLinks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading files");
  }
});

app.listen(8080, () => {
  console.log("Server is running port 8080");
});
