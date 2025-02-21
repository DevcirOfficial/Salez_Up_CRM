import React, { useState, useEffect } from "react";

const GenderDonutChart = () => {
  const female = 90; // Example value
  const male = 60; // Example value
  const total = female + male; // Dynamic total calculation

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke lengths dynamically
  const femaleDash = (female / total) * circumference;
  const maleDash = (male / total) * circumference;

  // States for animation
  const [animatedFemaleDash, setAnimatedFemaleDash] = useState(0);
  const [animatedMaleDash, setAnimatedMaleDash] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedFemaleDash(femaleDash);
      setAnimatedMaleDash(maleDash);
    }, 300); // Delay to trigger animation after mount
  }, [femaleDash, maleDash]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="mb-8 text-lg text-center text-[#269F8B] font-medium text-[22px]">Head Count: Gender</h2>

      <div className="relative w-[260px] h-[200px] flex items-center justify-center">
        {/* Numbers positioned outside */}
        <div className="absolute flex justify-between w-full font-medium text-gray-700 top-1/2">
          <span className="-translate-x-2 text-md text-[#000080]">{female}</span>
          <span className="translate-x-2 text-md text-[#000080]">{male}</span>
        </div>

        {/* SVG Chart */}
        <svg className="w-[200px] h-[200px] transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle (for reference) */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#E0E0E0" strokeWidth="20" />

{/* Female segment (Pink - starts from left) */}

<circle
  cx="60"
  cy="60"
  r={radius}
  fill="none"
  stroke="#FFC3E3"
  strokeWidth="20"
  strokeDasharray={`${animatedFemaleDash} ${circumference}`}
  strokeDashoffset={`-${animatedMaleDash}`}  // Shift pink to start from left
  style={{
    transition: "stroke-dasharray 1.5s ease-in-out",
  }}
/>

{/*  Male segment (Blue - follows pink) */}

<circle
  cx="60"
  cy="60"
  r={radius}
  fill="none"
  stroke="#CFF5FF"
  strokeWidth="20"
  strokeDasharray={`${animatedMaleDash} ${circumference}`}
  strokeDashoffset="0"  // Start blue from where pink ends
  style={{
    transition: "stroke-dasharray 1.5s ease-in-out",
  }}
/>
          
        </svg>
      </div>

      {/* Indicators row */}
      <div className="flex justify-center mt-4 space-x-6">
        {/* Female indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-[#FFC3E3]"></div>
          <span className="text-lg text-[#000080]">F</span>
        </div>
        {/* Male indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-[#CFF5FF]"></div>
          <span className="text-lg text-[#000080]">M</span>
        </div>
      </div>
    </div>
  );
};

export default GenderDonutChart;
