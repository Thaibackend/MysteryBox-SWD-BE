const createError = (res, status, message) => {
  return res.status(status).json({ success: false, message: message });
};

module.exports = createError;
