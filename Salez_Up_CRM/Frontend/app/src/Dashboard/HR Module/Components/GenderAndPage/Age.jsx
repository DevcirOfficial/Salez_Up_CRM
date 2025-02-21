import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const AgeDistributionChart = () => {
  const data = [
    { age: '<30', percentage: 65 },
    { age: '30-49', percentage: 20 },
    { age: '50+', percentage: 15 }
  ];

  const CustomLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text
        x={x + 25}
        y={y - 10}
        fill="#1F2937"
        textAnchor="middle"
        fontSize="14"
      >
        {value}%
      </text>
    );
  };



  const CustomTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y + 5})`}>
      <rect
        x="-20"
        y="-10"
        width="50"
        height="25"
        fill="#F3F4F6"
        rx="4"
   
      />
      <text
        x="4"
        y="8"
        textAnchor="middle"
        fill="#000080"
        fontSize="14"
      >
        {payload.value}
      </text>
    </g>
  );

  
  return (
    <div className="w-1/2 p-6 bg-white">
      <h2 className="mb-12 -mt-[25px] text-lg text-center text-[#269F8B] font-medium text-[22px]">Head Count : Age</h2>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart 
          data={data}
          margin={{ top: 30, right: 0, left: 0, bottom: 20 }}
        >
          <XAxis 
            dataKey="age"
            axisLine={false}
            tickLine={false}
            tick={<CustomTick />}
            tickMargin={8}
          />
          <Bar 
            dataKey="percentage"
            fill="#1f8675"
            barSize={45}
            label={<CustomLabel />}
          
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeDistributionChart;