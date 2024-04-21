import React from 'react';
import mock from '../utils/mockData';

function Table() {
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
        { mock.map((product, i) => (
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
