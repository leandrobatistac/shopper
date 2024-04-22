import React, { useContext, useState } from 'react';
import { FileContext, AllProductsContext, AllOkContext } from '../pages/main';
import NewProductsTable from '../components/newProductsTable';

function ValidateButton() {
  const [newProducts, setNewProducts] = useState([]);

  const { setAllOk } = useContext(AllOkContext);
  const { selectedFile } = useContext(FileContext);
  const { allProducts } = useContext(AllProductsContext);

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
      let verifyOk = true;

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
          verifyOk = false;
        }

        if (!productExists) {
          newProduct.condition = `O código do produto ${productCode} não está presente na lista de produtos.`;
          verifyOk = false;
        } 
        
        else {
          const prevProduct = allProducts.find(product => product.code === productCode);
          newProduct.name = prevProduct ? prevProduct.name : '';
          newProduct.oldPrice = prevProduct ? prevProduct.sales_price : 0;
        }

        newProduct.newPrice = newPrice; 
        tempNewProducts.push(newProduct);
      }

      setNewProducts(tempNewProducts);
      setAllOk(verifyOk);
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div>
      <button onClick={handleValidation}>Validar</button>
      {newProducts.length > 0 && <NewProductsTable newProducts={newProducts} />}
    </div>
  );
}

export default ValidateButton;
