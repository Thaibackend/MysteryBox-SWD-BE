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
      const { status, updateStatus } = req.body;
      const { packageInPeriodId } = req.params;
      const packageInPeriod = await db.PackageInPeriod.findByPk(
        packageInPeriodId
      );
      if (!packageInPeriod) {
        return next(createError(res, 404, "Không tìm thấy"));
      }

      const currentDate = new Date();
      if (status === "openingDate") {
        packageInPeriod.openingDate = currentDate;
      } else if (status === "packageDate") {
        packageInPeriod.packagingDate = currentDate;
      } else if (status === "deliveryDate") {
        packageInPeriod.deliveryDate = currentDate;
      } else if (status === "confirmDate") {
        packageInPeriod.confirmDate = currentDate;
      } else {
        return next(
          createError(res, 400, "Trạng thái truyền xuống không hợp lệ")
        );
      }
      packageInPeriod.status = updateStatus;
      await packageInPeriod.save();

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

  getBoxNotConfirm: async (req, res, next) => {
    try {
      const packageInPeriods = await db.PackageInPeriod.findAll();
      const boxsNotConfirm = packageInPeriods.filter(
        (el) => el.status === "OPEN"
      );
      const detailedBoxes = await Promise.all(
        boxsNotConfirm.map(async (box) => {
          const boxDetail = await db.MysteryBox.findByPk(box.boxId);
          const packageDetail = await db.PackageOrder.findByPk(
            box.packageOrderId
          );
          return {
            ...box.dataValues,
            boxDetail,
            packageDetail,
          };
        })
      );
      return res.json({
        success: true,
        message: "Lấy data thành công",
        packageInPeriods: detailedBoxes,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  getStatusBox: async (req, res, next) => {
    try {
      const packageInPeriods = await db.PackageInPeriod.findAll();
      const boxsNotConfirm = packageInPeriods.filter(
        (el) => el.status !== "OPEN"
      );
      const detailedBoxes = await Promise.all(
        boxsNotConfirm.map(async (box) => {
          const boxDetail = await db.MysteryBox.findByPk(box.boxId);
          const packageDetail = await db.PackageOrder.findByPk(
            box.packageOrderId
          );
          return {
            ...box.dataValues,
            boxDetail,
            packageDetail,
          };
        })
      );
      return res.json({
        success: true,
        message: "Lấy data thành công",
        packageInPeriods: detailedBoxes,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
