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
  getMysteryBoxCondition: async (req, res, next) => {
    try {
      const body = req.body;
      const birthDate = new Date(body.yob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      const mysteryBoxs = await db.MysteryBox.findAll();
      const filterBoxByThemeId = mysteryBoxs.filter(
        (el) => el.themeId == body.themeId
      );
      const filterBoxByAge = filterBoxByThemeId.filter((el) => {
        const [minAge, maxAge] = el.age.split("-").map(Number);
        return age >= minAge && age <= maxAge;
      });
      return res.json({
        success: true,
        message: "Lấy các box thành công",
        mysteryBoxs: filterBoxByAge.length > 0 ? filterBoxByAge : mysteryBoxs,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
