const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().min(5).required(),

  price: Joi.number().min(0).required(),

  category: Joi.string().trim().required(),

  stock: Joi.number().integer().min(0).required(),

  image: Joi.string().uri().allow("", null),

  isActive: Joi.boolean().default(true),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  description: Joi.string().trim().min(5),

  price: Joi.number().min(0),

  category: Joi.string().trim(),

  stock: Joi.number().integer().min(0),

  image: Joi.string().uri().allow("", null),

  isActive: Joi.boolean(),
}).min(1);

module.exports = {
  createProductSchema,
  updateProductSchema,
};
