const createError = require("../utils/error");
const db = require("../models");
const { Op } = require("sequelize");
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
      const { search, status } = req.query;
      const options = {
        order: [["createdAt", "DESC"]],
        where: {},
      };
      if (search) {
        options.where = {
          name: {
            [Op.like]: `%${search}%`,
          },
        };
      }
      if (status) {
        options.where.status = status;
      }
      const packages = await db.Package.findAll(options);
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
  deleteSoftPackage: async (req, res, next) => {
    try {
      const { status } = req.body;
      const packageId = req.params.id;
      const existedPackage = await db.Package.findByPk(packageId);
      if (!existedPackage) {
        return next(createError(res, 404, "Không tìm thấy package"));
      }
      await existedPackage.update({ status });
      return res.json({
        success: true,
        message: "Xóa thành công",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
