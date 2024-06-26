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
  // Get All Products - assim que o componente é montado
  useEffect(() => {
    const fetchData = async () => {
        const productsData = await getAllProducts();
        setAllProducts(productsData);
    };
    fetchData();
  },[]);

  // Estados globais: Selected File, All Products e All Ok
  const [allOk, setAllOk] = useState(false);
  const [allPacks, setAllPacks] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <AllProductsContext.Provider value={{ allProducts, setAllProducts }}>
        <AllPacksContext.Provider value={{ allPacks, setAllPacks }}>
          <AllOkContext.Provider value={{ allOk, setAllOk }}>
            <ConfirmedProductsContext.Provider value={{ confirmedProducts, setConfirmedProducts }}>
              <div>
                <br />
                <UploadButton />
                <br />
                <MainTable />
                <br />
                <UpdateButton />
                <br />
                <ValidateButton />
              </div>
            </ConfirmedProductsContext.Provider>
          </AllOkContext.Provider>
        </AllPacksContext.Provider>
      </AllProductsContext.Provider>
    </FileContext.Provider>
  );
}

export default Main;