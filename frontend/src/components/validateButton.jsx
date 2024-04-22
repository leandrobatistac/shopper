import React, { useContext, useState } from 'react';
import { FileContext, AllProductsContext, AllOkContext, ConfirmedProductsContext } from '../pages/main';
import NewProductsTable from '../components/newProductsTable';

function ValidateButton() {
  const [newProducts, setNewProducts] = useState([]);

  const { setAllOk } = useContext(AllOkContext);
  const { confirmedProducts, setConfirmedProducts } = useContext(ConfirmedProductsContext);
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
      const allLines = csvData.trim().split('\n').map(line => line.replace(/^"|"$/g, '').replace(/"\r?$/, ''));
      
      const tempNewProducts = [];
      let verifyOk = true;

      for (let i = 1; i < allLines.length; i++) {
        const line = allLines[i];
        const values = line.split(',');
        const newPrice = parseFloat(values[1]);
        const productCode = parseInt(values[0]);
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
          newProduct.newPrice = 0;
          newProduct.oldPrice = prevProduct.sales_price;
          newProduct.name = prevProduct.name;
          verifyOk = false;
          tempNewProducts.push(newProduct);
          continue;
        } 
        
        if (!prevProduct) {
          newProduct.condition = `O código do produto ${productCode} não está presente na lista de produtos.`;
          verifyOk = false;
          tempNewProducts.push(newProduct);
          continue;
        }

        if (newPrice <= prevProduct.cost_price) {
          newProduct.condition = `O preço de venda do produto não pode ser menor que o preço de custo.`;
          newProduct.oldPrice = prevProduct.sales_price;
          newProduct.name = prevProduct.name;
          newProduct.newPrice = newPrice; 
          verifyOk = false;
          tempNewProducts.push(newProduct);
          continue;
        } 
      
        const priceDifference = Math.abs(newPrice - parseFloat(prevProduct.sales_price));
        const maxAllowedDifference = parseFloat(prevProduct.sales_price) * 0.1;

        if (priceDifference > maxAllowedDifference) {
          newProduct.condition = `O novo preço deve estar no máximo 10% acima ou abaixo do preço atual.`;
          newProduct.oldPrice = prevProduct.sales_price;
          newProduct.name = prevProduct.name;
          newProduct.newPrice = newPrice; 
          verifyOk = false;
          tempNewProducts.push(newProduct);
          continue;
        }
        
        newProduct.oldPrice = prevProduct.sales_price;
        newProduct.name = prevProduct.name;
        newProduct.newPrice = newPrice; 
        tempNewProducts.push(newProduct);
      }

      setNewProducts(tempNewProducts);
      setAllOk(verifyOk);
      setConfirmedProducts(tempNewProducts);
    };
    
    reader.readAsText(selectedFile);
  };

  return (
    <div>
      <button onClick={handleValidation}>Validar</button>
      {newProducts.length > 0 && <NewProductsTable newProducts={confirmedProducts} />}
    </div>
  );
}

export default ValidateButton;
