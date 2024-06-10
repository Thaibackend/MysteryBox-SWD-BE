// const createError = require("../utils/error");

// module.exports = {
//   uploadImage: async (req, res, next) => {
//     try {
//       const file = req.file;
//       return res.json({ success: true, file: file.path });
//     } catch (error) {
//       return next(createError(res, 500, error.message));
//     }
//   },
//   uploadImages: async (req, res, next) => {
//     try {
//       const files = req.files;
//       const fileLinks = files.map((file) => file.path);
//       //   res.send({ files: fileLinks });
//       return res.json({ success: true, files: fileLinks });
//     } catch (error) {
//       return next(createError(res, 500, error.message));
//     }
//   },
// };
