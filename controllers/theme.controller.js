const db = require("../models");
const createError = require("../utils/error");
const { Op } = require("sequelize");
module.exports = {
  createTheme: async (req, res, next) => {
    try {
      const body = req.body;
      const newTheme = await db.Theme.create(body);
      return res.status(201).json({
        success: true,
        message: "Tạo theme thành công",
        theme: newTheme,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getThemes: async (req, res, next) => {
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

      const themes = await db.Theme.findAll(options);
      return res.json({
        success: true,
        message: "Lấy dữ liệu theme thành công",
        themes,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },

  deleteTheme: async (req, res) => {
    try {
      const { status } = req.body;
      const themeId = req.params.id;
      const existedTheme = await db.Theme.findByPk(themeId);
      if (!existedTheme) {
        return next(createError(res, 404, "Không tìm thấy theme này"));
      }
      await existedTheme.update({ status: status });
      if (status === 0) {
        return res.json({
          success: true,
          message: "Xóa thành công",
        });
      } else {
        return res.json({
          success: true,
          message: "Khôi phục thành công",
        });
      }
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
