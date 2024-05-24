const createError = require("../utils/error");
const db = require("../models");
module.exports = {
  createPackge: async (req, res, next) => {
    try {
      const body = req.body;
      const newPackage = await db.Package.create(body);
      return res.status(201).json({
        success: true,
        message: "Tạo package thành công",
        package: newPackage,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getPackages: async (req, res, next) => {
    try {
      const packages = await db.Package.findAll();
      return res.json({
        success: true,
        message: "Lấy dữ liệu package thành công",
        packages,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  updatePackage: async (req, res, next) => {
    try {
      const body = req.body;
      const packageId = req.params.id;
      const existedPackage = await db.Package.findByPk(packageId);
      if (!existedPackage) {
        return next(createError(res, 404, "Không tìm thấy package"));
      }
      const updatePackage = await existedPackage.update(body);
      return res.json({
        success: true,
        message: "Chỉnh sửa package thành công",
        package: updatePackage,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
