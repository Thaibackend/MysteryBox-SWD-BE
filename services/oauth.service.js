const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  loginSuccessService: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        let response = await db.UserThird.findOne({
          where: {
            id,
          },
          raw: true,
        });
        const token =
          response &&
          jwt.sign(
            { id: response.id, role: response.role, email: response.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
        resolve({
          success: true,
          token,
        });
      } catch (error) {
        reject({
          success: false,
          message: error.mesage,
        });
      }
    }),
};
