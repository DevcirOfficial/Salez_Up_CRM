import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

const Commission_Potvalue = () => {
  const [overallPotValue, setOverallPotValue] = useState(() => {
    const savedOverallPot = localStorage.getItem('OverallPotValue');
    return savedOverallPot ? parseFloat(savedOverallPot) : 0;
  });
  
  const [potLevelData, setPotLevelData] = useState(() => {
    const savedData = localStorage.getItem('potLevelData');
    if (savedData) return JSON.parse(savedData);
    return [
      { levelName: "Level 1", salesAgents: 12, revenueStart: 1500.0, revenueEnd: 4500.0, crRequirement: 20.0, crPenalty: 25, potValue: 0, weighting: 3.5, perPayout: 0 },
      { levelName: "Level 2", salesAgents: 18, revenueStart: 4501.0, revenueEnd: 7000.0, crRequirement: 25.0, crPenalty: 25, potValue: 0, weighting: 3.5, perPayout: 0 },
      { levelName: "Level 3", salesAgents: 25, revenueStart: 7001.0, revenueEnd: 10000.0, crRequirement: 30.0, crPenalty: 25, potValue: 0, weighting: 8.0, perPayout: 0 },
      { levelName: "Level 4", salesAgents: 15, revenueStart: 10001.0, revenueEnd: 12500.0, crRequirement: 31.0, crPenalty: 25, potValue: 0, weighting: 10.0, perPayout: 0 },
      { levelName: "Level 5", salesAgents: 9, revenueStart: 12501.0, revenueEnd: 15000.0, crRequirement: 32.0, crPenalty: 25, potValue: 0, weighting: 15.0, perPayout: 0 },
      { levelName: "Level 6", salesAgents: 7, revenueStart: 15001.0, revenueEnd: 18000.0, crRequirement: 33.0, crPenalty: 25, potValue: 0, weighting: 30.0, perPayout: 0 },
      { levelName: "Level 7", salesAgents: 5, revenueStart: 18001.0, revenueEnd: null, crRequirement: 34.0, crPenalty: 25, potValue: 0, weighting: 30.0, perPayout: 0 },
    ];
  });
  
  const [editingCell, setEditingCell] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [lastToastId, setLastToastId] = useState(null);
  
  // Toast styles
  const toastStyles = {
    error: {
      background: '#FEE2E2', // Light red background
      color: '#B91C1C',     // Darker red text
      border: '1px solid #FECACA',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      fontWeight: '500',
    },
    success: {
      background: '#DCFCE7', // Light green background
      color: '#166534',     // Darker green text
      border: '1px solid #BBF7D0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      fontWeight: '500',
    }
  };
  
  // Function to recalculate pot values and per payouts
  const recalculateValues = (data) => {
    return data.map((level) => ({
      ...level,
      potValue: (level.weighting / 100) * overallPotValue,
      perPayout: ((level.weighting / 100) * overallPotValue) / level.salesAgents
    }));
  };
  
  useEffect(() => {
    setPotLevelData(prevData => recalculateValues(prevData));
  }, [overallPotValue]);
  
  useEffect(() => {
    localStorage.setItem('potLevelData', JSON.stringify(potLevelData));
  }, [potLevelData]);
  
  const formatCurrency = (value) => (value === null ? '-' : `£${value.toFixed(2)}`);
  
  const handleCellClick = (index, field) => {
    if (['weighting', 'salesAgents', 'crPenalty', 'crRequirement'].includes(field)) {
      setEditingCell({ index, field });
      setInputValue(potLevelData[index][field].toString());
    }
  };
  
  const validateInput = (field, value) => {
    // Clear previous toast when validating
    if (lastToastId) {
      toast.dismiss(lastToastId);
    }
    
    // Check for letters
    if (/[a-zA-Z]/.test(value)) {
      const fieldMessages = {
        weighting: 'Weighting field cannot contain letters',
        salesAgents: 'Sales Agents field cannot contain letters',
        crPenalty: 'CR Penalty field cannot contain letters',
        crRequirement: 'CR Requirement field cannot contain letters'
      };
      const id = toast.error(fieldMessages[field] || 'This field cannot contain letters', { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }
    
    // Allow empty field during typing
    if (value === '' || value === '-' || value === '.') {
      return true;
    }
    
    const numericValue = parseFloat(value);
    
    if (isNaN(numericValue)) {
      const id = toast.error(`Please enter a valid number for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }
    
    // Field-specific validations
    if (field === 'weighting' && (numericValue < 0 || numericValue > 100)) {
      const id = toast.error("Weighting must be between 0 and 100", { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }
    
    if (field === 'salesAgents') {
      if (numericValue <= 0) {
        const id = toast.error("Sales Agents must be a positive number", { style: toastStyles.error });
        setLastToastId(id);
        return false;
      }
      
      if (!Number.isInteger(Number(value))) {
        const id = toast.error("Sales Agents must be a whole number", { style: toastStyles.error });
        setLastToastId(id);
        return false;
      }
    }
    
    if (field === 'crPenalty' && numericValue < 0) {
      const id = toast.error("CR Penalty cannot be negative", { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }
    
    if (field === 'crRequirement' && numericValue < 0) {
      const id = toast.error("CR Requirement cannot be negative", { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }
    
    return true;
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (editingCell) {
      validateInput(editingCell.field, value);
    }
  };
  
  const updateCellValue = () => {
    if (!editingCell) return;
    
    const { index, field } = editingCell;
    const numericValue = parseFloat(inputValue);
    
    // Final validation before updating
    if (inputValue !== '' && !isNaN(numericValue) && validateInput(field, inputValue)) {
      setPotLevelData(prevData => {
        const newData = [...prevData];
        newData[index] = {
          ...newData[index],
          [field]: numericValue
        };
        // Recalculate values immediately after updating a field
        return recalculateValues(newData);
      });
      
      // Clear previous error toast and show success
      if (lastToastId) {
        toast.dismiss(lastToastId);
      }
      toast.success('Value updated successfully', { style: toastStyles.success });
      return true;
    }
    return false;
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (updateCellValue()) {
        setEditingCell(null);
      }
    } else if (e.key === 'Escape') {
      if (lastToastId) {
        toast.dismiss(lastToastId);
      }
      setEditingCell(null);
    }
  };
  
  const handleBlur = () => {
    updateCellValue();
    setEditingCell(null);
  };
  
  const renderCell = (level, index, field) => {
    if (editingCell?.index === index && editingCell?.field === field) {
      return (
        <input
          type="text"
          className="w-20 px-2 py-1 text-center border rounded"
          value={inputValue}
          autoFocus
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      );
    }
    
    if (['weighting', 'crPenalty', 'crRequirement'].includes(field)) {
      return (
        <div
          className="py-4 cursor-pointer hover:bg-gray-100"
          onClick={() => handleCellClick(index, field)}
        >
          {level[field]}%
        </div>
      );
    }
    
    if (field === 'salesAgents') {
      return (
        <div
          className="py-4 cursor-pointer hover:bg-gray-100"
          onClick={() => handleCellClick(index, field)}
        >
          {level[field]}
        </div>
      );
    }
    
    return <div className="py-4">{level[field]}</div>;
  };
  
  return (
    <div className="w-full">
      <Toaster 
        position="top-right" 
        richColors
        toastOptions={{
          duration: 3000,
          className: "rounded-lg shadow-md"
        }}
      />
      <div className="flex flex-col w-full gap-8 px-4 mt-8 mb-4">
        <div className="p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm">
          <h2 className="mb-2 text-xl font-semibold text-[#269F8B]">Overall Pot Value</h2>
          <p className="text-lg font-400">{formatCurrency(overallPotValue)}</p>
        </div>
        <div className="overflow-x-auto bg-white border-2 border-gray-100 rounded-lg shadow-sm">
          <div className="p-6">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-md text-[#269F8B] text-center ">
                  <th>Level Name</th>
                  <th>Revenue Start</th>
                  <th>Revenue End</th>
                  <th>CR Requirement</th>
                  <th>Weighting</th>
                  <th>Pot Value</th>
                  <th>CR Penalty</th>
                  <th>Sales Agents</th>
                  <th>Per Payout</th>
                </tr>
              </thead>
              <tbody className=''>
                {potLevelData.map((level, index) => (
                  <tr key={index} className="text-base text-center border-t">
                    <td className='font-semibold'>{renderCell(level, index, 'levelName')}</td>
                    <td>{formatCurrency(level.revenueStart)}</td>
                    <td>{formatCurrency(level.revenueEnd)}</td>
                    <td>{renderCell(level, index, 'crRequirement')}</td>
                    <td>{renderCell(level, index, 'weighting')}</td>
                    <td>{formatCurrency(level.potValue)}</td>
                    <td>{renderCell(level, index, 'crPenalty')}</td>
                    <td>{renderCell(level, index, 'salesAgents')}</td>             
                    <td>{formatCurrency(level.perPayout)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission_Potvalue;