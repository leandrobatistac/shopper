import React, { useContext, useState } from 'react';
import { FileContext, AllProductsContext } from '../pages/main';

function ValidateButton() {
  const [allOk, setAllOk] = useState(true);
  const { selectedFile } = useContext(FileContext);
  const { allProducts } = useContext(AllProductsContext);
  const [newProducts, setNewProducts] = useState([]);

  const handleValidation = () => {
    if (!selectedFile) {
      alert('Você deve fazer upload de um arquivo CSV antes de validar.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target.result;
      const allLines = csvData.split('\n').map(line => line.replace(/^"|"$/g, '').replace(/"\r?$/, ''));

      const tempNewProducts = [];
      let areAllOk = true; 

      for (let i = 1; i < allLines.length; i++) {
        const line = allLines[i];
        const values = line.split(',');
        const newPrice = parseFloat(values[1]);
        const productCode = parseInt(values[0]);
        const productExists = allProducts.some(product => product.code === productCode);
        
        let newProduct = {
          code: productCode,
          name: '',
          oldPrice: 0,
          newPrice: 0,
          condition: 'Ok'
        };

        if (isNaN(newPrice)) {
          newProduct.condition = 'O preço deve estar preenchido e ser um valor numérico válido.';
          areAllOk = false;
        }

        if (!productExists) {
          newProduct.condition = `O código do produto ${productCode} não está presente na lista de produtos.`;
          areAllOk = false;
        } else {
          const prevProduct = allProducts.find(product => product.code === productCode);
          newProduct.name = prevProduct ? prevProduct.name : '';
          newProduct.oldPrice = prevProduct ? prevProduct.sales_price : 0;
        }

        newProduct.newPrice = newPrice; 
        tempNewProducts.push(newProduct);
      }

      setNewProducts(tempNewProducts);
      setAllOk(areAllOk);
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div>
      <button onClick={handleValidation}>Validar</button>
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

export default ValidateButton;
