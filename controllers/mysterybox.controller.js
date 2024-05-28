const db = require("../models");
const createError = require("../utils/error");
module.exports = {
  createMysteryBox: async (req, res, next) => {
    try {
      const body = req.body;
      const newBox = await db.MysteryBox.create(body);
      return res
        .status(201)
        .json({ success: true, message: "Tạo box thành công", box: newBox });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getMysteryBox: async (req, res, next) => {
    try {
      const mysteryBoxs = await db.MysteryBox.findAll();
      return res.json({
        success: true,
        message: "Lấy các box thành công",
        mysteryBoxs,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
