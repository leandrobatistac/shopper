import React, { useEffect, useContext } from 'react';
import { AllProductsContext } from '../pages/main';
import { getAllProducts } from '../utils/api';

function Table() {
  const { allProducts, setAllProducts } = useContext(AllProductsContext);

  // GetAll em todos os produtos, e armazena em allProducts
  useEffect(() => {
    const fetchData = async () => {
        const productsData = await getAllProducts();
        setAllProducts(productsData);
    };
    fetchData();
  },);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Produto</th>
          <th>Custo</th>
          <th>Preço atual</th>
        </tr>
      </thead>
      <tbody>
        {allProducts.map((product, i) => (
          <tr key={i}>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.cost_price}</td>
            <td>{product.sales_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
