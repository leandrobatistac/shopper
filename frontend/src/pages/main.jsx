import React, { createContext, useState, useEffect } from 'react';
import MainTable from '../components/mainTable';
import UploadButton from '../components/uploadButton';
import ValidateButton from '../components/validateButton';
import UpdateButton from '../components/updateButton';
import { getAllProducts } from '../utils/api';

export const FileContext = createContext();
export const AllOkContext = createContext();
export const AllProductsContext = createContext();

function Main() {
  // Get All Products - assim que o componente é montado
  useEffect(() => {
    const fetchData = async () => {
        const productsData = await getAllProducts();
        setAllProducts(productsData);
    };
    fetchData();
  },);

  // Estados globais: Selected File, All Products e All Ok
  const [allOk, setAllOk] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <AllProductsContext.Provider value={{ allProducts, setAllProducts }}>
        <AllOkContext.Provider value={{ allOk, setAllOk }}>
          <div>
            <UploadButton />
            <UpdateButton />
            <MainTable />
            <div className="button-container">
            <ValidateButton />
            </div>
          </div>
        </AllOkContext.Provider>
      </AllProductsContext.Provider>
    </FileContext.Provider>
  );
}

export default Main;