import React, { useState, useEffect } from 'react';

const PotCommission_with_agent = () => {
  const [levelData, setLevelData] = useState(() => {
    const savedData = localStorage.getItem('levelData');
    if (savedData) return JSON.parse(savedData);
    
    return [
      { levelName: "Level 1", salesAgent: 5 },
      { levelName: "Level 2", salesAgent: 8 },
      { levelName: "Level 3", salesAgent: 12 },
      { levelName: "Level 4", salesAgent: 15 },
      { levelName: "Level 5", salesAgent: 10 },
      { levelName: "Level 6", salesAgent: 7 },
      { levelName: "Level 7", salesAgent: 4 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('levelData', JSON.stringify(levelData));
  }, [levelData]);

  const handleEdit = (index, value) => {
    const newData = [...levelData];
    newData[index].salesAgent = parseInt(value) || 0;
    setLevelData(newData);
  };

  const tableHeaders = [
    'Level Name',
    'Sales Agent'
  ];

  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex flex-col w-full gap-8 px-4 mt-8 mb-4">
          <div className="flex flex-col w-full gap-6 p-8 pb-12 bg-white rounded-lg shadow">
   
            <div className="overflow-x-auto bg-white border-2 border-gray-100 rounded-lg shadow-sm">
              <div className="p-6">
                <table className="w-full min-w-max">
                  <thead>
                    <tr className="text-lg text-[#269F8B] text-center">
                      {tableHeaders.map((header, index) => (
                        <th key={index} className="pb-4 font-semibold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {levelData.map((level, index) => (
                      <tr key={index} className="text-base text-center border-t">
                        <td className="py-4 text-center">{level.levelName}</td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center">
                            <input
                              type="number"
                              className="w-24 text-center bg-transparent border-none outline-none"
                              value={level.salesAgent}
                              onChange={(e) => handleEdit(index, e.target.value)}
                              min="0"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotCommission_with_agent;