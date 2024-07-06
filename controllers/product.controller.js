const { Op } = require("sequelize");
const db = require("../models");
const createError = require("../utils/error");
module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await db.Product.create(body);
      return res.status(201).json({
        success: true,
        message: "Create Product Success",
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
        age: product.age,
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
        message: "Get Data Success",
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
        message: "Get data Success",
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
        return next(createError(res, 404, "Product Not Found"));
      }
      await existedProduct.destroy();
      return res.json({
        success: true,
        message: "Delete Product Success",
      });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
  randomProduct: async (req, res, next) => {
    try {
      const products = await db.Product.findAll();
      const kidId = req.params.kidId;
      const packageId = req.params.packageId;
      const packageCurrent = await db.Package.findByPk(packageId);
      const kidCurrent = await db.KidProfile.findByPk(kidId);
      const filteredProducts = products.filter((product) => {
        let matchedAttributes = 0;

        if (kidCurrent && product.color === kidCurrent?.color) {
          matchedAttributes++;
        }

        if (kidCurrent && product.origin === kidCurrent?.toyOrigin) {
          matchedAttributes++;
        }

        if (kidCurrent && product.gender === kidCurrent?.gender) {
          matchedAttributes++;
        }

        if (kidCurrent && product.material.includes(kidCurrent?.material)) {
          matchedAttributes++;
        }

        return matchedAttributes >= 2;
      });
      let resultProducts = [...filteredProducts];
      if (filteredProducts.length < packageCurrent?.numberOfSend) {
        const remainingProducts = products.filter(
          (product) => !filteredProducts.includes(product)
        );
        while (
          resultProducts.length < packageCurrent?.numberOfSend &&
          remainingProducts.length > 0
        ) {
          const randomIndex = Math.floor(
            Math.random() * remainingProducts.length
          );
          const randomProduct = remainingProducts.splice(randomIndex, 1)[0];
          resultProducts.push(randomProduct);
        }
      }
      res.json({ success: true, renderProducts: resultProducts });
    } catch (error) {
      return next(createError(res, 500, error.message));
    }
  },
};
