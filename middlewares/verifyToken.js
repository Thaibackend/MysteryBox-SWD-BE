const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const rawToken = token.split(" ")[1];
  if (!token) return rext(createError(res, 403, "Không cung cấp token"));
  jwt.verify(rawToken, process.env.JWT_SECRET, (error, decode) => {
    if (error) {
      return next(createError(res, 403, "Token không hợp lế"));
    }
    req.user = decode;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "ADMIN") {
    next(createError(res, 401, "Bạn không có quyền truy cập vào"));
  }
  next();
};

const isStaff = (req, res, next) => {
  const { role } = req.user;
  if (role === "USER") {
    next(createError(res, 401, "Bạn không có quyền truy cập vào"));
  }
  next();
};

module.exports = { verifyToken, isAdmin, isStaff };
