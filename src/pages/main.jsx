import React, { createContext, useState } from 'react';
import Table from '../components/table';
import UploadButton from '../components/uploadButton';
import ValidateButton from '../components/validateButton';
import UpdateButton from '../components/updateButton';

export const FileContext = createContext();

function Main() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <div>
        <div className="button-container">
          <UploadButton />
          <ValidateButton />
          <UpdateButton />
        </div>
          <Table />
      </div>
    </FileContext.Provider>
  );
}

export default Main;