const { Product } = require('../model/productModel');

async function getAllProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error('Erro ao buscar todos os produtos:', error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
};
