// Main.js

import React, { createContext, useState, useEffect } from 'react';
import MainTable from '../components/mainTable';
import UploadButton from '../components/uploadButton';
import ValidateButton from '../components/validateButton';
import UpdateButton from '../components/updateButton';
import { getAllProducts } from '../services/productsService';

export const FileContext = createContext();
export const AllOkContext = createContext();
export const AllPacksContext = createContext();
export const AllProductsContext = createContext();
export const ConfirmedProductsContext = createContext();

function Main() {
  const [allOk, setAllOk] = useState(false);
  const [allPacks, setAllPacks] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getAllProducts();
      setAllProducts(productsData);
    };
    fetchData();
  }, []);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <AllProductsContext.Provider value={{ allProducts, setAllProducts }}>
        <AllPacksContext.Provider value={{ allPacks, setAllPacks }}>
          <AllOkContext.Provider value={{ allOk, setAllOk }}>
            <ConfirmedProductsContext.Provider value={{ confirmedProducts, setConfirmedProducts }}>
              <div>
                <UploadButton />
                <MainTable />
                <UpdateButton allProducts={allProducts} setAllProducts={setAllProducts} />
                <ValidateButton allProducts={allProducts} setAllProducts={setAllProducts} />
              </div>
            </ConfirmedProductsContext.Provider>
          </AllOkContext.Provider>
        </AllPacksContext.Provider>
      </AllProductsContext.Provider>
    </FileContext.Provider>
  );
}

export default Main;
