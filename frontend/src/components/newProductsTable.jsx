import React from 'react';

function NewProductsTable({newProducts}) {
  return (
    <div>
      {newProducts.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço Atual</th>
              <th>Novo Preço</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {newProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>R$ {product.oldPrice}</td>
                <td>R$ {product.newPrice}</td>
                <td>{product.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NewProductsTable;
