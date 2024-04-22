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

async function updateProduct(code, newValue) {
  try {
    const product = await Product.findOne({ where: { code } });
    if (!code) { throw new Error('User não encontrado'); }
    product.sales_price = newValue;
    await product.save();
    return product;
  } catch (error) {
    console.error('Erro ao atualizar Produto:', error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  updateProduct,
};
