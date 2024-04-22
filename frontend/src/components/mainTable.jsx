import React, { useContext } from 'react';
import { AllProductsContext } from '../pages/main';

function MainTable() {
  const { allProducts } = useContext(AllProductsContext);

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

export default MainTable;
