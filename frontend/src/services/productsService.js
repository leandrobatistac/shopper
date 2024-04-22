const getAllProducts = async () => {
  const response = await fetch('http://localhost:3000/products');
  const data = await response.json();
  return data;
};

const getAllPacks = async () => {
  const response = await fetch('http://localhost:3000/packs');
  const data = await response.json();
  return data;
};

export {
  getAllProducts,
  getAllPacks
};