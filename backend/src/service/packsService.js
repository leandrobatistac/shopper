const { Packs } = require('../model/packsModel');

async function getAllPacks() {
  try {
    const packs = await Packs.findAll();
    return packs;
  } catch (error) {
    console.error('Erro ao buscar todos os packs:', error);
    throw error;
  }
}

module.exports = {
  getAllPacks,
};
