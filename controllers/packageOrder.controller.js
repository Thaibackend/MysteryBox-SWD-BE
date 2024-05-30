const db = require("../models");
const createError = require("../utils/error");

module.exports = {
  orderPackage: async (req, res, next) => {
    try {
      const body = req.body;
      const packageId = req.params.id;
      const newOrder = await db.PackageOrder.create({
        ...body,
        packageId: packageId,
      });

      return res.status(201).json({
        success: true,
        messsage: "Thêm package vào giỏ hàng thành công",
        order: newOrder,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  getPackageOrderByUserId: async (req, res, next) => {
    try {
      const user = req.user;
      const kidProfiles = await db.KidProfile.findAll();
      const kidIds = kidProfiles
        .filter((kidProfile) => kidProfile.userId === user.userId)
        .map((kidProfile) => kidProfile.id);
      const packageOrders = await db.PackageOrder.findAll({
        where: {
          kidId: {
            [db.Sequelize.Op.in]: kidIds,
          },
        },
      });
      return res.json({
        success: true,
        message: "Lấy dữ liệu package order thành công",
        packageOrders,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
