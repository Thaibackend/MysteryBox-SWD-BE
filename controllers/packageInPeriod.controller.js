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
      const { productId, packageOrderId } = req.params;
      const packageInPeriods = await db.PackageInPeriod.findAll();
      const matchingPackageOrder = packageInPeriods.filter(
        (el) => el.packageOrderId == packageOrderId
      );
      const notHasProduct = matchingPackageOrder.filter(
        (el) => el.productId === null
      );

      if (notHasProduct.length > 0) {
        await Promise.all(
          notHasProduct.map(async (item) => {
            item.productId = productId;
            item.openingDate = new Date();
            await item.save();
          })
        );
      }
      return res.json({
        success: true,
        message: "Chọn sản phẩm gửi thành công",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  updateStatusOrder: async (req, res, next) => {
    try {
      const { status } = req.body;
      const { packageInPeriodId } = req.params;
      const packgeInPeriod = await db.PackageInPeriod.findByPk(
        packageInPeriodId
      );
      if (!packgeInPeriod) {
        return next(createError(res, 404, "Không tìm thấy"));
      }

      const currentDate = new Date();
      if (status === "packageDate") {
        packgeInPeriod.packagingDate = currentDate;
      } else if (status === "deliveryDate") {
        packgeInPeriod.deliveryDate = currentDate;
      } else if (status === "confirmDate") {
        packgeInPeriod.confirmDate = currentDate;
      } else {
        return next(
          createError(res, 400, "Trạng thái truyền xuống không hợp lệ")
        );
      }

      await packgeInPeriod.save();

      return res.json({
        success: true,
        message: "Trạng thái cập nhật thành công",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  getPackageInPeriodOfPackageOrder: async (req, res, next) => {
    try {
      const { packageOrderId } = req.params;
      const packageInPeriods = await db.PackageInPeriod.findAll();
      const packageOrder = await db.PackageOrder.findByPk(packageOrderId);
      if (!packageOrder) {
        return res.status(404).json({ error: "PackageOrder not found" });
      }
      const packageDetails = await db.Package.findByPk(packageOrder.packageId);
      const matchingPackageOrder = packageInPeriods.filter(
        (packageInPeriod) => packageInPeriod.packageOrderId == packageOrderId
      );
      const hasProduct = matchingPackageOrder.filter(
        (el) => el.productId !== null
      );
      const result = await Promise.all(
        hasProduct.map(async (item) => {
          const boxDetails = await db.MysteryBox.findByPk(item.boxId);
          const packageOrderDetails = await db.PackageOrder.findByPk(
            item.packageOrderId
          );
          const productDetails = await db.Product.findByPk(item.productId);
          return {
            boxs: boxDetails,
            packages: packageDetails,
            packageOrder: packageOrderDetails,
            product: productDetails,
            status: item.status,
            dates: {
              openingDate: item.openingDate,
              packagingDate: item.packagingDate,
              deliveryDate: item.deliveryDate,
              confirmDate: item.confirmDate,
            },
          };
        })
      );
      return res.json({ success: true, data: result });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
