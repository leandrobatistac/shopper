const productService = require('../service/productService');

const getAllProducts = async (req, res, next) => {
  try {
    const allTeams = await productService.getAllProducts();
    res.status(200).json(allTeams);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { code, newValue } = req.body;
    const product = await productService.updateProduct(code, newValue);
    res.status(200).json(product);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const productController = {
  getAllProducts,
  updateProduct,
};

module.exports = productController;
