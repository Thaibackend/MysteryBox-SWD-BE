const createError = require("../utils/error");
const OauthService = require("../services/oauth.service");
module.exports = {
  loginSuccess: async (req, res, next) => {
    const { id } = req.body;
    try {
      if (!id) {
        next(createError(res, 400, "Không nhận được đầu vào"));
      }
      let response = await OauthService.loginSuccessService(id);
      return res.json({ success: true, response });
    } catch (error) {
      next(createError(res, 500, error.mesage));
    }
  },
};
