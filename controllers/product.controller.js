const { Op } = require("sequelize");
const db = require("../models");
const createError = require("../utils/error");
const weightedRandomProduct = require("../utils/weightedRandomProduct");
module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await db.Product.create(body);
      return res.status(201).json({
        success: true,
        message: "Tạo sản phẩm thành công",
        product: newProduct,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await db.Product.findByPk(productId);
      const box = await db.MysteryBox.findByPk(product.boxId);
      const theme = await db.Theme.findByPk(product.themeId);
      const productWithoutIds = {
        name: product.name,
        images: product.images,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        gender: product.gender,
        color: product.color,
        type: product.type,
        material: product.material,
        origin: product.origin,
        status: product.status,
        box: box,
        theme: theme,
      };

      return res.json({
        success: true,
        message: "Sản phẩm",
        product: productWithoutIds,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const {
        boxIdQuery,
        themeIdQuery,
        originQuery,
        colorQuery,
        fromPrice,
        toPrice,
        search,
        status,
      } = req.query;
      const options = {
        where: {},
      };
      const fromDefaultPrice = 0;
      const toDefaultPrice = 1000000000;
      const fromNumberPrice = Number(fromPrice) || Number(fromDefaultPrice);
      const toNumberPrice = Number(toPrice) || Number(toDefaultPrice);
      if (fromPrice || toPrice) {
        options.where = {
          price: {
            [Op.between]: [fromNumberPrice, toNumberPrice],
          },
        };
      }
      if (boxIdQuery) {
        const boxIds = boxIdQuery.split(",").map((boxId) => boxId.trim());
        options.where.boxId = {
          [Op.in]: boxIds,
        };
      }
      if (themeIdQuery) {
        const themeIds = themeIdQuery
          .split(",")
          .map((themeId) => themeId.trim());
        options.where.themeId = {
          [Op.in]: themeIds,
        };
      }
      if (originQuery) {
        const origins = originQuery.split(",").map((origin) => origin.trim());
        options.where.origin = {
          [Op.in]: origins,
        };
      }
      if (colorQuery) {
        const colors = colorQuery.split(",").map((color) => color.trim());
        options.where.color = {
          [Op.in]: colors,
        };
      }
      if (search) {
        options.where = {
          name: {
            [Op.like]: `%${search}%`,
          },
        };
      }
      if (status) {
        options.where.status = status;
      }
      const products = await db.Product.findAll(options);
      return res.json({
        success: true,
        message: "Lấy dữ liệu sản phẩm thành công",
        products,
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const existedProduct = await db.Product.findByPk(productId);
      if (!existedProduct) {
        return next(createError(res, 404, "Không tìm thấy sản phẩm này"));
      }
      await existedProduct.destroy();
      return res.json({
        success: true,
        message: "Xóa thành công",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  randomProduct: async (req, res, next) => {
    try {
      const products = await db.Product.findAll();
      const { color, origin, gender, material } = req.body;
      const filtersProducts = products.filter((product) => {
        let matchedAttributes = 0;

        if (color && product.color === color) {
          matchedAttributes++;
        }

        if (origin && product.origin === origin) {
          matchedAttributes++;
        }

        if (gender && product.gender === gender) {
          matchedAttributes++;
        }

        if (material && product.material.includes(material)) {
          matchedAttributes++;
        }

        return matchedAttributes >= 2;
      });
      const productRandomAll = weightedRandomProduct(products);
      if (filtersProducts.length === 0) {
        return res.json({
          success: true,
          message: "Sản phẩm của bạn",
          product: productRandomAll,
        });
      }
      const selectedProduct = weightedRandomProduct(filtersProducts);
      if (selectedProduct) {
        return res.json({
          success: true,
          message: "Sản phẩm của bạn",
          product: selectedProduct,
        });
      } else {
        return res.json({
          success: true,
          message: "Sản phẩm của bạn",
          product: productRandomAll,
        });
      }
    } catch (error) {}
  },
};
