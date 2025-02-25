import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

const OverallPot = () => {
  const [inputValue, setInputValue] = useState("");
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

  // Load initial value from localStorage on component mount
  useEffect(() => {
    const storedValue = localStorage.getItem("OverallPotValue");
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  // Update localStorage whenever inputValue changes
  useEffect(() => {
    localStorage.setItem("OverallPotValue", inputValue);
  }, [inputValue]);

  // Validate input in real-time
  const validateInput = (value) => {
    // Clear previous toast when validating
    if (lastToastId) {
      toast.dismiss(lastToastId);
    }

    // Allow empty input
    if (value === "" || value === "." || value === "-") {
      return true;
    }

    // Check for letters
    if (/[a-zA-Z]/.test(value)) {
      const id = toast.error("Pot value cannot contain letters", { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }

    const numericValue = parseFloat(value);

    // Check if it's a valid number
    if (isNaN(numericValue)) {
      const id = toast.error("Please enter a valid number", { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }

    // Check if value is negative
    if (numericValue < 0) {
      const id = toast.error("Pot value cannot be negative", { style: toastStyles.error });
      setLastToastId(id);
      return false;
    }

    // This is a valid input - show success toast
    if (value !== "") {
      const id = toast.success("Valid pot value", { style: toastStyles.success });
      setLastToastId(id);
    }
    
    return true;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };

  // Handle input blur
  const handleBlur = () => {
    // Format the value as currency if it's a valid number
    if (inputValue && !isNaN(parseFloat(inputValue))) {
      const formattedValue = parseFloat(inputValue).toFixed(2);
      setInputValue(formattedValue);
      
      // Show confirmation toast
      if (lastToastId) {
        toast.dismiss(lastToastId);
      }
      
      toast.success(`Pot value set to £${formattedValue}`, { 
        style: toastStyles.success 
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <Toaster 
        position="top-right" 
        richColors
        toastOptions={{
          duration: 3000,
          className: "rounded-lg shadow-md"
        }}
      />
      <div className="w-[30%] p-6 mx-auto font-mono bg-white rounded-lg shadow-lg">
        <label className="block mb-4 text-xl font-bold text-themeGreen" htmlFor="unique-input">
          Enter Overall Pot Value
        </label>
        <input
          className="w-[80%] mt-4 text-lg text-center px-4 py-2 transition duration-300 ease-in-out transform bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"
          placeholder="Enter pot value"
          type="text" 
          id="unique-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <div className="mt-4 text-sm text-gray-500">
          {inputValue && !isNaN(parseFloat(inputValue)) && 
            <p>Current value: £{parseFloat(inputValue).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default OverallPot;