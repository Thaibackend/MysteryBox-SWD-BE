const db = require("../models");
const createError = require("../utils/error");

module.exports = {
  createPackageInPeriod: async (req, res, next) => {
    try {
      const body = req.body;
      const newPackageInPeriod = await db.PackageInPeriod.create(body);
      return res.status(201).json({
        success: true,
        message: "Tạo thành công",
        packageInPeriod: newPackageInPeriod,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  getPackageInPeriodByPackageOrder: async (req, res) => {
    try {
      const packageOrderId = req.params.id;
      const packageInPeriod = await db.PackageInPeriod.findAll({
        where: { packageOrderId },
      });
      return res.json({
        success: true,
        message: "Lấy data thành công",
        packageInPeriod,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getAllPackageInPeriod: async (req, res) => {
    try {
      const packageInPeriods = await db.PackageInPeriod.findAll();
      return res.json({
        success: true,
        message: "Lấy data thành công",
        packageInPeriods,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  addProductPackageInPeriod: async (req, res, next) => {
    try {
      const { productId, packageInPeriodId } = req.params;
      const packageInPeriod = await db.PackageInPeriod.findByPk(
        packageInPeriodId
      );
      await packageInPeriod.update({ productId });
      return res.json({
        success: true,
        message: "Chọn sản phẩm gửi thành công",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
