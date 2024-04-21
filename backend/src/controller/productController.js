const productService = require('../service/productService');

const getAllProducts = async (req, res, next) => {
  try {
    const allTeams = await productService.getAllProducts();
    res.status(200).json(allTeams);
  } catch (error) {
    next(error);
  }
};

const productController = {
  getAllProducts,
};

module.exports = productController;
