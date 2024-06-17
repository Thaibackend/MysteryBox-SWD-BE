const createError = require("../utils/error");
const db = require("../models");
module.exports = {
  updateProfileUser: async (req, res) => {
    const body = req.body;
    const userId = req.params.id;
    try {
      const existedProfileUser = await db.User.findByPk(userId);
      if (!existedProfileUser) {
        return next(
          createError(res, 404, "Không tìm thấy thông tin người dùng này")
        );
      }
      const updateProfileUser = await existedProfileUser.update(body);
      return res.json({
        success: true,
        message: "Cập nhật thông tin người dùng thành công",
        userProfile: updateProfileUser,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
