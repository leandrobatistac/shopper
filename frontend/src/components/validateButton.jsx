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
        const prevProduct = allProducts.find(product => product.code === productCode);
        
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

        if (newPrice < prevProduct.cost_price) {
          newProduct.condition = `O preço de venda do produto não pode ser menor que o preço de custo.`;
          newProduct.oldPrice = prevProduct ? prevProduct.sales_price : 0;
          newProduct.name = prevProduct ? prevProduct.name : '';
          verifyOk = false;
        } 

        const prevPriceFixed = parseFloat(prevProduct.sales_price).toFixed(2);
        const lowerBound = parseFloat((prevPriceFixed * 0.9).toFixed(2));
        const upperBound = parseFloat((prevPriceFixed * 1.1).toFixed(2));

        if (newPrice < lowerBound || newPrice > upperBound) {
          newProduct.condition = `O novo preço deve ser exatamente 10% a mais ou a menos que o preço atual.`;
          newProduct.oldPrice = prevProduct ? prevProduct.sales_price : 0;
          newProduct.name = prevProduct ? prevProduct.name : '';
          verifyOk = false;
        } 

        else {
          newProduct.oldPrice = prevProduct ? prevProduct.sales_price : 0;
          newProduct.name = prevProduct ? prevProduct.name : '';
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
