const express = require("express");
const connectDatabase = require("./config/connectDatabase");
const initRouter = require("./routers/index");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: axios } = require("axios");
const cloudinary = require("./config/cloundinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("./passport");

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

app.post("/payment", async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var accessKey = "F8BBA842ECF85";
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var orderInfo = "pay with MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  var ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  var requestType = "payWithMethod";
  var amount = "50000";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });
  //option for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;
  try {
    result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
});

// app.post("/callback", async (req, res) => {});
app.listen(8080, () => {
  console.log("Server is running port 8080");
});
