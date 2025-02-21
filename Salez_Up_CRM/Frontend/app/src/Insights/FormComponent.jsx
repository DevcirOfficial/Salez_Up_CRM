import React, { useState } from 'react';
import { StarIcon } from './Icons';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { getChatGPTResponse } from './Api'; // Import the API method

const FormComponent = ({ onGenerateInsights }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    month: '',
    target: '',
    actual: '',
    workingDays: '',
    totalDays: '',
  });

  const WorkingDays = {
    January: 24,
    February: 23,
    March: 23,
    April: 24,
    May: 25,
    June: 24,
    July: 23,
    August: 25,
    September: 23,
    October: 24,
    November: 24,
    December: 23,
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setFormData({
      ...formData,
      month: selectedMonth,
      totalDays: WorkingDays[selectedMonth] || '',
    });
    setHasError(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    // Check if working days exceed total days
    if (name === 'workingDays' && newFormData.totalDays) {
      const isInvalid = Number(value) > Number(newFormData.totalDays);
      setHasError(isInvalid);

      if (isInvalid) {
        toast.error('Working days cannot exceed total days in the month', {
          position: 'top-right',
          duration: 3000,
        });
      }
    }
  };

//   const handleClick = async () => {
//     if (!hasError) {
//       setIsClicked(true);

//       try {
//         // Call the ChatGPT API with form data
//         const { target, actual, workingDays, totalDays } = formData;
//         const response = await getChatGPTResponse(target, actual, workingDays, totalDays);
//         console.log('API Response:', response); // Log the response to the console

//         // Pass the form data to the parent component (if needed)
//         onGenerateInsights(formData);
//       } catch (error) {
//         console.error('Error calling ChatGPT API:', error);
//         toast.error('Failed to generate insights. Please try again.', {
//           position: 'top-right',
//           duration: 3000,
//         });
//       }

//       setTimeout(() => setIsClicked(false), 1000);
//     }
//   };




const handleClick = async () => {
    if (!hasError) {
      setIsClicked(true);
  
      try {
        const { target, actual, workingDays, totalDays } = formData;
        const response = await getChatGPTResponse(target, actual, workingDays, totalDays);
        console.log('API Response:', response);
  
        // Pass response to parent (Graph)
        onGenerateInsights(response); 
      } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        toast.error('Failed to generate insights. Please try again.', {
          position: 'top-right',
          duration: 3000,
        });
      }
  
      setTimeout(() => setIsClicked(false), 1000);
    }
  };
  



  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center p-8">
        <div className="w-[70%] form-input mt-12">
          <div className="relative z-10 pt-6 w-full p-8 mx-auto overflow-hidden bg-white rounded-lg shadow-md before:w-32 before:h-24 before:absolute before:bg-[#1E8675] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="mb-8 text-2xl font-bold text-[#1E8675] items-center justify-center flex w-full">
              Generate your Insights
            </h2>

            <form method="post" action="#" className="flex flex-col items-center justify-center">
              <div className="mb-4 w-[300px]">
                <label className="block text-sm font-semibold text-[#1E8675]" htmlFor="month">
                  Month
                </label>
                <select
                  className="w-full p-2 mt-1 text-center border rounded-md"
                  name="month"
                  id="month"
                  value={formData.month}
                  onChange={handleMonthChange}
                >
                  <option value="">Select Month</option>
                  {Object.keys(WorkingDays).map((month) => (
                    <option key={month} value={month} className="">
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 w-[300px]">
                <label className="block text-sm font-semibold text-[#1E8675]" htmlFor="target">
                  Target
                </label>
                <input
                  className="w-full p-2 mt-1 text-center border rounded-md"
                  name="target"
                  id="target"
                  type="number"
                  value={formData.target}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 w-[300px]">
                <label className="block text-sm font-semibold text-[#1E8675]" htmlFor="actual">
                  Actual
                </label>
                <input
                  className="w-full p-2 mt-1 text-center border rounded-md"
                  name="actual"
                  id="actual"
                  type="number"
                  value={formData.actual}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 w-[300px]">
                <label className="block text-sm font-semibold text-[#1E8675]" htmlFor="workingDays">
                  Working Days
                </label>
                <input
                  className={`w-full p-2 mt-1 text-center border rounded-md ${
                    hasError ? 'border-red-500 bg-red-50' : 'bg-gray-50'
                  }`}
                  name="workingDays"
                  id="workingDays"
                  type="number"
                  value={formData.workingDays}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 w-[300px]">
                <label className="block text-sm font-semibold text-[#1E8675]" htmlFor="totalDays">
                  Total Days
                </label>
                <input
                  className="w-full p-2 mt-1 text-center border rounded-md"
                  name="totalDays"
                  id="totalDays"
                  type="number"
                  value={formData.totalDays}
                  readOnly
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className={`relative group flex items-center gap-2 px-6 py-3 rounded-lg border-none bg-gradient-to-r from-[#5bfcc4] via-[#f593e4] to-[#71a4f0] text-white font-semibold text-lg tracking-wide transition-all duration-300 shadow-[inset_0_0_5px_#ffffffa9,inset_0_35px_30px_#000,0_5px_10px_#000000cc] hover:scale-105 hover:ring-2 hover:ring-white/30 active:scale-95 active:mt-[2px] active:shadow-[inset_0_0_5px_#ffffffa9,inset_0_30px_25px_#000] ${
                    isClicked ? 'animate-pulse' : ''
                  } ${hasError ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleClick}
                  disabled={hasError}
                >
                  <div className="absolute inset-0 rounded-lg z-[-1] transition-all duration-300 group-hover:blur-[10px] group-active:blur-[5px] group-active:translate-y-[1px]" />
                  <StarIcon className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                  <span className="relative">
                    AI Insights
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ${isHovered ? 'w-full' : ''}`} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponent;