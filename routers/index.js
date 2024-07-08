const AuthRouter = require("./auth.router");
const KidProfileRouter = require("./profilekid.router");
const PackageRouter = require("./package.router");
const PackageOrderRouter = require("./packageOrder.router");
const PeriodRouter = require("./period.router");
const ThemeRouter = require("./theme.router");
const MysteryBoxRouter = require("./mysterybox.router");
const PackageInPeriodRouter = require("./packageInPeriod.router");
const ProductRouter = require("./product.router");
const oAuthRouter = require("./oauth.router");
const userRouter = require("./user.router");
const paymentRouter = require("./payment.router");
// const uploadRouter = require("./upload.router");
const initRouter = (app) => {
  app.use("/api/v1", AuthRouter);
  app.use("/api/v1", KidProfileRouter);
  app.use("/api/v1", PackageRouter);
  app.use("/api/v1", PackageOrderRouter);
  app.use("/api/v1", PeriodRouter);
  app.use("/api/v1", ThemeRouter);
  app.use("/api/v1", MysteryBoxRouter);
  app.use("/api/v1", PackageInPeriodRouter);
  app.use("/api/v1", ProductRouter);
  app.use("/api/v1", userRouter);
  app.use("/api/v1", paymentRouter);
  app.use("/api/auth", oAuthRouter);
};

module.exports = initRouter;
