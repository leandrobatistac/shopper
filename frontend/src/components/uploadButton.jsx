import React, { useContext } from 'react';
import { FileContext } from '../pages/main'; 

function UploadButton() {
  const { setSelectedFile } = useContext(FileContext);

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleUploadChange} />
    </div>
  );
}

export default UploadButton;
