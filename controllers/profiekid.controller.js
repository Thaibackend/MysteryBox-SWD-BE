const db = require("../models");
const createError = require("../utils/error");
module.exports = {
  createProfile: async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const newKidProfile = await db.KidProfile.create({
        ...body,
        userId: user.userId,
      });
      return res.status(201).json({
        success: true,
        message: "Tạo thông tin cho con thành công",
        kidProfile: newKidProfile,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getProfileByUserId: async (req, res, next) => {
    try {
      const user = req.user;
      const kidProfiles = await db.KidProfile.findAll();
      const kidProfilesByUserId = kidProfiles.filter(
        (profile) => profile.userId === user.userId
      );
      return res.json({
        success: true,
        message: "Tài khoản con của bạn đã lấy thành công",
        kidProfilesByUserId,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const user = req.user;
      const profileId = req.params.id;
      const body = req.body;
      const existedProfile = await db.KidProfile.findByPk(profileId);
      if (!existedProfile) {
        return next(
          createError(res, 404, "Không tìm thấy thông tin cá nhân này")
        );
      }
      if (user.userId !== existedProfile.userId) {
        return next(
          createError(
            res,
            403,
            "Tài khoản không có quyền chỉnh sửa thông tin này"
          )
        );
      }
      const updateProfile = await existedProfile.update(body);
      return res.json({
        success: true,
        message: "Cập nhật thông tin thành công",
        kidProfile: updateProfile,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  bannedProfile: async (req, res, next) => {
    try {
      const user = req.user;
      const { status } = req.body;
      const profileId = req.params.id;
      const existedProfile = await db.KidProfile.findByPk(profileId);
      if (!existedProfile) {
        return next(
          createError(res, 404, "Không tìm thấy thông tin cá nhân này")
        );
      }
      if (user.userId !== existedProfile.userId) {
        return next(
          createError(
            res,
            403,
            "Tài khoản này không có quyền thực hiện chức năng"
          )
        );
      }
      await existedProfile.update({ status: status });
      return res.json({
        success: true,
        message: "Ban tài khoản của con thành công",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
