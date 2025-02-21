import React, { useState } from 'react';
import FormComponent from './FormComponent';
import ModalComponent from './ModalComponent';


const Graph = () => {
  const [modalState, setModalState] = useState({ isOpen: false, activeTab: 'insights' });
  const [apiResponse, setApiResponse] = useState(null);

  // const handleGenerateInsights = () => {
  //   setModalState((prev) => ({ ...prev, isOpen: true }));
  // };

  const handleGenerateInsights = (data) => {
    setApiResponse(data); // Save API response
    setModalState((prev) => ({ ...prev, isOpen: true }));
  };


  return (
    <div>
     <FormComponent onGenerateInsights={handleGenerateInsights} />
      <ModalComponent
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        activeTab={modalState.activeTab}
        setActiveTab={(tab) => setModalState((prev) => ({ ...prev, activeTab: tab }))}
        apiResponse={apiResponse} // Pass API response to modal (if needed)
      />
    </div>
  );
};

export default Graph;