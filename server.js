const express = require("express");
const connectDatabase = require("./config/connectDatabase");
const initRouter = require("./routers/index");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDatabase();
initRouter(app);
app.listen(8080, () => {
  console.log("Server is running port 8080");
});
