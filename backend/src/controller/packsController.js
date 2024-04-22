const packsService = require('../service/packsService');

const getAllPacks = async (req, res, next) => {
  try {
    const allPacks = await packsService.getAllPacks();
    res.status(200).json(allPacks);
  } catch (error) {
    next(error);
  }
};

const packsController = {
  getAllPacks,
};

module.exports = packsController;
