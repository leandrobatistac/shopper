import React, { useContext } from 'react';
import { FileContext } from '../pages/main';

function ValidateButton() {
  const { selectedFile } = useContext(FileContext);

  const handleValidation = () => {
    if (!selectedFile) {
      alert('Você deve fazer Upload de um arquivo CSV antes de validar.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const lines = csvData.split('\n');

      lines.slice(1).forEach((line, index) => {
        const values = line.split(',');
        if (values.length !== 2 || isNaN(values[0]) || isNaN(values[1])) {
          alert(`Linha: ${index + 2}: Todos os produtos devem possuir "product_code" e "new_price" válidos.`);
          return;
        }
      });

      alert('Validação concluída. Todos os campos estão preenchidos corretamente.');
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div>
      <button onClick={handleValidation}>Validar</button>
    </div>
  );
}

export default ValidateButton;
