const db = require("../models");
const createError = require("../utils/error");
const moment = require("moment");
const { Op } = require("sequelize");
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

  getPackageOrderByIdPk: async (req, res, next) => {
    try {
      const packageOrderId = req.params.id;
      const packageOrder = await db.PackageOrder.findByPk(packageOrderId);
      return res.json({
        success: true,
        message: "Package Order",
        packageOrder,
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

  getAllOrder: async (req, res, next) => {
    try {
      const orders = await db.PackageOrder.findAll();
      return res.json({ success: true, orders });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  pushPackageInPeriod: async (req, res, next) => {
    try {
      const packageOrderId = req.params.id;
      const body = req.body;
      const packageOrder = await db.PackageOrder.findByPk(packageOrderId);
      const pushPackageOrder = [
        ...packageOrder.packageInPeriodIds,
        body.packageInPeriodId,
      ];
      const updatePackageOrder = await packageOrder.update({
        packageInPeriodIds: pushPackageOrder,
      });
      return res.json({
        success: true,
        message: "Thêm gói package nhỏ thành công",
        packageOrder: updatePackageOrder,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  pushProductOrder: async (req, res, next) => {
    try {
      const { packageOrderId } = req.params;
      const packageOrder = await db.PackageOrder.findByPk(packageOrderId);
      const plainPackageOrder = packageOrder.get({ plain: true });
      const packageInPeriods = await db.PackageInPeriod.findAll();
      const matchingPeriods = packageInPeriods.filter(
        (el) => el.packageOrderId == packageOrderId
      );
      const periodsWithProduct = matchingPeriods.filter(
        (el) => el.status !== "OPEN"
      );

      if (periodsWithProduct.length === 0) {
        return next(createError(res, 404, "Không khớp với cái nào"));
      }
      let packageInPeriodIds = [];
      periodsWithProduct.forEach((period) => {
        if (!packageInPeriodIds.includes(period.id)) {
          packageInPeriodIds.push(period.id);
        }
      });
      packageOrder.packageInPeriodIds = packageInPeriodIds;
      await packageOrder.save();

      return res.json({
        success: true,
        message: "Thêm PeriodId vào thành công",
        packageOrder,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  revenueWeekDashboard: async (req, res, next) => {
    try {
      const startOfWeek = moment().startOf("week").toDate();
      const endOfWeek = moment().endOf("week").toDate();

      const startOfLastWeek = moment()
        .subtract(1, "weeks")
        .startOf("week")
        .toDate();
      const endOfLastWeek = moment()
        .subtract(1, "weeks")
        .endOf("week")
        .toDate();

      const ordersThisWeek = await db.PackageOrder.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfWeek, endOfWeek],
          },
        },
      });

      const ordersLastWeek = await db.PackageOrder.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfLastWeek, endOfLastWeek],
          },
        },
      });

      let countThisWeek = ordersThisWeek.length;
      let sumMoneyThisWeek = ordersThisWeek.reduce((sum, order) => {
        const totalPrice = parseFloat(order.totalPrice.replace(/,/g, "")) || 0;
        return sum + totalPrice;
      }, 0);

      let sumMoneyLastWeek = ordersLastWeek.reduce((sum, order) => {
        const totalPrice = parseFloat(order.totalPrice.replace(/,/g, "")) || 0;
        return sum + totalPrice;
      }, 0);

      let growthRate = 0;
      if (sumMoneyLastWeek > 0) {
        growthRate =
          ((sumMoneyThisWeek - sumMoneyLastWeek) / sumMoneyLastWeek) * 100;
      }

      return res.json({
        success: true,
        countThisWeek,
        sumMoneyThisWeek,
        growthRate,
      });
    } catch (error) {
      console.error("Error in revenueWeekDashboard:", error);
      return next(
        createError(
          res,
          500,
          "An error occurred while calculating revenue. Please try again later."
        )
      );
    }
  },
};
