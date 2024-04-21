import React, { useState } from 'react';

function UploadButton({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);

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
