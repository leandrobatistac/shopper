import React, { useContext, useEffect, useState } from 'react';
import { AllOkContext, AllProductsContext, ConfirmedProductsContext } from '../pages/main';
import { getAllProducts } from '../services/productsService';

function UpdateButton() {
  const { allOk, setAllOk } = useContext(AllOkContext);
  const { confirmedProducts, setConfirmedProducts } = useContext(ConfirmedProductsContext);
  const { setAllProducts } = useContext(AllProductsContext);

  const [isBtnDisabled, setIsBtnDisabled] = useState(allOk);

  useEffect(() => {
    setIsBtnDisabled(allOk);
  }, [allOk]);

  const handleUpdateClick = async () => {
    let allSuccessful = true;

    for (const p of confirmedProducts) {
      try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: p.code,
            newValue: p.newPrice
          })
        });

        if (!response.ok) {
          console.error('Erro ao atualizar produto:', response.statusText);
          allSuccessful = false;
        }
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        allSuccessful = false;
      }
    }

    if (allSuccessful) {
      const updatedProducts = await getAllProducts();
      setAllProducts(updatedProducts);
      setConfirmedProducts([]);
      setAllOk(false);
    }
  };

  return (
    <div>
      <button disabled={!isBtnDisabled} onClick={handleUpdateClick}>
        Atualizar
      </button>
    </div>
  );
}

export default UpdateButton;
