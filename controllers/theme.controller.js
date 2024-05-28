const db = require("../models");
const createError = require("../utils/error");
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
      const themes = await db.Theme.findAll();
      return res.json({
        success: true,
        message: "Lấy dữ liệu theme thành công",
        themes,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
