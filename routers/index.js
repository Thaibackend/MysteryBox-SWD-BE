const AuthRouter = require("./auth.router");
const KidProfileRouter = require("./profilekid.router");
const PackageRouter = require("./package.router");
const PackageOrderRouter = require("./packageOrder.router");
const initRouter = (app) => {
  app.use("/api/v1", AuthRouter);
  app.use("/api/v1", KidProfileRouter);
  app.use("/api/v1", PackageRouter);
  app.use("/api/v1", PackageOrderRouter);
};

module.exports = initRouter;
