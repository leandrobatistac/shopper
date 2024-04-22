import React, { createContext, useState } from 'react';
import Table from '../components/table';
import UploadButton from '../components/uploadButton';
import ValidateButton from '../components/validateButton';
import UpdateButton from '../components/updateButton';

export const FileContext = createContext();
export const AllProductsContext = createContext();

function Main() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <AllProductsContext.Provider value={{ allProducts, setAllProducts }}>
        <div>
          <UploadButton />
          <UpdateButton />
          <Table />
          <div className="button-container">
          <ValidateButton />
          </div>
        </div>
      </AllProductsContext.Provider>
    </FileContext.Provider>
  );
}

export default Main;