const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");
module.exports = {
  register: async (req, res, next) => {
    try {
      const body = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(body.password, salt);
      const user = await db.User.findOne({
        where: { username: body.username },
      });
      if (user && user.phone === body.phone) {
        return next(createError(res, 401, "Số điện thoại này đã sử dụng"));
      }
      if (user) {
        return next(createError(res, 401, "Nguời dùng đã tồn tại"));
      }

      const newUser = await db.User.create({ ...body, password: hashPassword });
      return res
        .status(201)
        .json({ success: true, message: "Đăng ký thành công", user: newUser });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  login: async (req, res, next) => {
    try {
      const body = req.body;
      const user = await db.User.findOne({
        where: { username: body.username },
      });
      if (!user) {
        return next(createError(res, 401, "Nguời dùng không tồn tại"));
      }
      const comparePassword = bcrypt.compareSync(body.password, user.password);
      if (!comparePassword)
        return next(
          createError(res, 401, "Mật khẩu hoặc tài khoản không đúng")
        );
      const isBanned = await db.User.findOne({
        where: { username: body.username, status: 0 },
      });
      if (isBanned)
        return next(
          createError(res, 403, "Tài khoản của bạn bị chặn bởi quản trị viên")
        );
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({
        success: true,
        message: "Đăng nhập thành công",
        accessToken: token,
        user: user,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
