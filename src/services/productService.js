const Product = require("../models/Product");

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProducts = async (
  page = 1,
  limit = 10,
  search = "",
  category = "",
  minPrice,
  maxPrice,
  sort = "-createdAt"
) => {
  const skip = (page - 1) * limit;

  const filter = {};

  // Search
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Category
  if (category) {
    filter.category = {
      $regex: `^${category}$`,
      $options: "i",
    };
  }

  // Price
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const totalProducts = await Product.countDocuments(filter);

  return {
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  };
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const getProductStats = async () => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: {
          $sum: 1,
        },
        totalStock: {
          $sum: "$stock",
        },
        averagePrice: {
          $avg: "$price",
        },
        minPrice: {
          $min: "$price",
        },
        maxPrice: {
          $max: "$price",
        },
      },
    },
  ]);

  if (stats.length === 0) {
    return {
      totalProducts: 0,
      totalStock: 0,
      averagePrice: 0,
      minPrice: 0,
      maxPrice: 0,
    };
  }

  return {
    totalProducts: stats[0].totalProducts,
    totalStock: stats[0].totalStock,
    averagePrice: Number(
      stats[0].averagePrice.toFixed(2)
    ),
    minPrice: stats[0].minPrice,
    maxPrice: stats[0].maxPrice,
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
};
