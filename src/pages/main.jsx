import React from 'react';
import Table from '../components/table';
import UploadButton from '../components/uploadButton';
import ValidateButton from '../components/validateButton';
import UpdateButton from '../components/updateButton';

function Main() {
  return (
    <div>
      <div className="button-container">
        <UploadButton />
        <ValidateButton />
        <UpdateButton />
      </div>
        <Table />
    </div>
  );
}

export default Main;