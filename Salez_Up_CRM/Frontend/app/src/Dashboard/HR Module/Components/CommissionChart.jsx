import React,{useState} from "react";
import { ChevronDown,ChevronLeft,ChevronRight } from 'lucide-react';
import {
  ComposedChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

const Graph = () => {
  const staticData = [
    { month: "Jan", target: 10300 },
    { month: "Feb", target: 9000 },
    { month: "Mar", target: 11000 },
    { month: "Apr", target: 8000 },
    { month: "May", target: 14000 },
    { month: "June", target: 9000 },
    { month: "July", target: 15000 },
    { month: "Aug", target: 10000 },
    { month: "Sep", target: 13000 },
    { month: "Oct", target: 5000 },
    { month: "Nov", target: 11000 },
    { month: "Dec", target: 8000 },
  ];

  const formatYAxis = (value) => {
    if (value === 0) return "$0";
    if (value >= 1000) {
      return `$${value / 1000}k`;
    }
    return `$${value}`;
  };


/// Commission teams ///


const [selectedCampaign, setSelectedCampaign] = useState(null);
const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);
const [orderedCampaigns, setOrderedCampaigns] = useState([
  { id: 1, name: "Coke", image: "/images/coke.png" },
  { id: 2, name: "Lipton", image: "/images/lipton.png" },
  { id: 4, name: "Vodafone", image: "/images/vodafone.png" },
  { id: 3, name: "Three", image: "/images/3campaign.png" },
]);

const handleCampaignSelect = (campaign, isFromDropdown) => {
  setSelectedCampaign(campaign);
  if (isFromDropdown) {
    setOrderedCampaigns([
      campaign,
      ...orderedCampaigns.filter((c) => c.id !== campaign.id),
    ]);
  }
  setIsCampaignDropdownOpen(false);
};

const visibleCampaigns = orderedCampaigns.slice(0, 3);
const dropdownCampaigns = orderedCampaigns.slice(3);


// Campaign logic ends ///
  


  return (
    <div className="w-full p-5 pt-6 bg-white rounded-lg shadow-2xl">
      <div className="flex items-center justify-between mb-2 ">
        <h3 className="mb-6  font-400 text-[#269F8B] font-medium text-[22px]">Commission Paid by Month</h3>
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2 ">
 
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCampaign(null);
                setOrderedCampaigns([...orderedCampaigns].sort((a, b) => a.id - b.id));
              }}
              className={`p-1.5 px-2.5 rounded-lg bg-white shadow-md shadow-[#409084]/10 ${
                // selectedCampaign === null ? "text-[#009245] " : "text-gray-400"
                   selectedCampaign === null ? "bg-[#1f8675] text-white font-medium " : "text-gray-400"
              }`}
            >
              ALL
            </button>
            {visibleCampaigns.map((campaign) => (
              <button
                key={campaign.id}
                onClick={() => handleCampaignSelect(campaign, false)}
                className="p-2.5"
              >
                <img
                  src={campaign.image}
                  alt={campaign.name}
                  className={`w-8 h-8 rounded-full transition-opacity ${
                    selectedCampaign?.id === campaign.id ? "opacity-100" : "opacity-40"
                  }`}
                />
              </button>
            ))}
            {dropdownCampaigns.length > 0 && (
              <div className="relative">
                {/* <button
                  onClick={() => setIsCampaignDropdownOpen(!isCampaignDropdownOpen)}
                  className="p-1 px-2.5 rounded-lg bg-white shadow-md shadow-[#409084]/10 text-gray-400 flex items-center gap-1"
                >
                  More
                  <ChevronDown className="w-4 h-4" />
                </button> */}
                <button
  onClick={() => setIsCampaignDropdownOpen(!isCampaignDropdownOpen)}
  className={`p-1 px-2.5 rounded-lg flex items-center gap-1 ${
    isCampaignDropdownOpen 
      ? "bg-[#1f8675] text-white" 
      : "bg-white text-gray-400"
  } shadow-md shadow-[#409084]/10`}
>
  More
  <ChevronDown className="w-4 h-4" />
</button>
                {isCampaignDropdownOpen && (
                  <div className="absolute left-0 mt-2 py-1 bg-white rounded-lg shadow-lg min-w-[120px] z-10">
                    {dropdownCampaigns.map((campaign) => (
                      <button
                        key={campaign.id}
                        onClick={() => handleCampaignSelect(campaign, true)}
                        className="flex items-center justify-center w-full p-2 hover:bg-gray-50"
                      >
                        <img
                          src={campaign.image}
                          alt={campaign.name}
                          className={`w-6 h-6 rounded-full transition-opacity ${
                            selectedCampaign?.id === campaign.id ? "opacity-100" : "opacity-50"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>


          </div>
          
          <div className="relative">
  <select
    className="px-2 py-1.5 text-md text-center font-normal text-[#072D20] bg-white border border-gray-300 rounded-xl shadow-md cursor-pointer focus:outline-none focus:ring-0 focus:ring-green-500"
  >
    {Array.from({ length: 6 }, (_, i) => 2025 + i).map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
</div>

        </div>
      </div>

      <ComposedChart
        width={1200}
        height={300}
        data={staticData}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fill: "#4B5563", fontWeight: "500" }}
          padding={{ left: 20, right: 20 }} 
          tickMargin={10} 
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fill: "#4B5563", fontWeight: "500" }}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          formatter={(value) => `$${value.toLocaleString()}`}
          contentStyle={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        <Bar
          dataKey="target"
          fill="#1f8675"
          radius={[4, 4, 0, 0]}
          barSize={24}
        >
          <LabelList
            dataKey="target"
            position="top"
            content={({ x, y, value }) => (
              <g>
                <rect
                  x={x - 12}
                  y={y - 30}
                  width={46}
                  height={20}
                  fill="#FFFFFF"
                  stroke="#E0E0E0"
                  strokeWidth={1}
                  rx={4}
                  ry={4}
                />
                <text
                  x={x + 8}
                  y={y - 16}
                  textAnchor="middle"
                  fill="#009245"
                  fontSize={12}
                  fontWeight="600"
                >
                  ${value / 1000}K
                </text>
              </g>
            )}
          />
        </Bar>
      </ComposedChart>
    </div>
  );
};

export default Graph;