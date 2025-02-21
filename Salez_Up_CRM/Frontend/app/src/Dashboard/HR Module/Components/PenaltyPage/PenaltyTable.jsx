import React, { useState } from 'react';
import { ChevronDown, Edit, Plus } from 'lucide-react';


// Image of Edit //

import EditPenalty from './edit_btn.png';
import AddPenalty from './edit_icons.jpg';

const CommissionRules = () => {
  const [penalties, setPenalties] = useState([
    { id: 1, name: '1st Warning', impact: '50%', hasDropdown: true },
    { id: 2, name: '2nd Warning', impact: '75%', hasDropdown: true },
    { id: 3, name: 'Final Warning', impact: '100%', hasDropdown: true },
    { id: 4, name: 'Absence Review', impact: '50%', hasDropdown: true },
  ]);

  const addPenalty = () => {
    const newId = penalties.length + 1;
    setPenalties([
      ...penalties,
      { 
        id: newId, 
        name: `New Penalty ${newId}`, 
        impact: '0%',
        hasDropdown: false 
      }
    ]);
  };

  return (
    <div className='flex flex-row w-full p-12 space-x-4'>
      <div className="w-[55%]">
        <h2 className="mb-6  font-400 text-[#269F8B] font-medium text-[22px]">Commission Rules</h2>
        
        <div className="relative">
          {/* Border styling */}
          <div className="absolute inset-0  border-[#161313b0] border-dashed border-2  "></div>
          
          <table className="w-full p-4">
            <thead className=''>
              <tr>
                <th className="w-1/2 text-md p-4 font-medium text-[#1E8675] border-b border-r border-[#161313b0] border-2"     style={{ borderStyle: "dashed", borderWidth: "2.2px", borderSpacing: "40px" }}>
                  Commission Penalty
                </th>
                <th className="w-1/2 text-md p-4 font-medium text-[#1E8675] border-b border-[#161313b0] border-dashed border-2"  style={{ borderStyle: "dashed", borderWidth: "2.2px", borderSpacing: "20px" }}>
                  Commission Impact
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {penalties.map((penalty) => (
                <tr key={penalty.id}>
               
                  <td className="p-4  border-r-2  border-[#161313b0] border-dashed  ml-2">
                    <div className="flex items-center  p-3 rounded-md w-[85%] mx-auto justify-center bg-[#FFFFFF] shadow-lg">
                      <span className='pl-4 font-500 '>{penalty.name}</span>
                      {penalty.hasDropdown && <ChevronDown className="text-[#1E8675] ml-4" size={20} />}
                    </div>
                  </td>
                  <td className="flex flex-row items-center justify-center p-4 pl-6 mx-auto space-x-4 ">
                    <div className="p-3  text-center rounded-md w-[80%] bg-[#F5FBFA] ">
                      <span className='text-sm text-center'>{penalty.impact}</span>
                    
                    </div>
                    <button className="text-[#262626] pt-2 font-semibold">
                        {/* <Edit size={20}   /> */}
                        <img src={EditPenalty} className='w-5 h-5'/>
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative w-[40%] ">
  <button 
    onClick={addPenalty} 
    className="absolute bottom-4 right-0 flex flew-row  space-x-8  mr-2  tracking-[1%] [box-shadow:0px_4px_4px_0px_#40908417] bg-white text-black  justify-center items-center h-[50px] w-[200px] rounded-[10px]   font-[500] text-[14px]  "
  >
          <img src={AddPenalty} className='w-6 h-6 '/>
   <span className='text-[#072D20]'>Add Penalty</span> 
  </button>
</div>



    </div>
  );
};

export default CommissionRules;