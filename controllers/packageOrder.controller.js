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
};
