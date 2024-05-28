const db = require("../models");
const createError = require("../utils/error");

module.exports = {
  createPackageInPeriod: async (req, res, next) => {
    try {
      const body = req.body;
      const newPackageInPeriod = await db.PackageInPeriod.create(body);
      return res
        .status(201)
        .json({
          success: true,
          message: "Tạo thành công",
          packageInPeriod: newPackageInPeriod,
        });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
