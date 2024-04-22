import React, { useContext, useEffect, useState } from 'react';
import { AllOkContext } from '../pages/main';

function UpdateButton() {
  const { allOk } = useContext(AllOkContext);
  const [isBtnDisabled, setIsBtnDisabled] = useState(allOk);

  useEffect(() => {
    setIsBtnDisabled(allOk);
  }, [allOk]);

  return (
    <div>
      <button disabled={!isBtnDisabled}>
        Atualizar
      </button>
    </div>
  );
}

export default UpdateButton;
