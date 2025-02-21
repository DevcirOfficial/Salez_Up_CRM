import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Graph = () => {
  const retentionData = [
    { month: "Jan", left: 5, remaining: 100 },
    { month: "Feb", left: 8, remaining: 145 },
    { month: "Mar", left: 6, remaining: 190 },
    { month: "Apr", left: 7, remaining: 285 },
    { month: "May", left: 10, remaining:280 },
    { month: "June", left: 12, remaining: 175 },
    { month: "July", left: 9, remaining: 170 },
    { month: "Aug", left: 11, remaining: 165 },
    { month: "Sep", left: 6, remaining: 160 },
    { month: "Oct", left: 7, remaining: 155 },
    { month: "Nov", left: 5, remaining: 150 },
    { month: "Dec", left: 8, remaining: 173 },
  ];

  const calculatedData = retentionData.map(({ month, left, remaining }) => ({
    month,
    // retentionRate: ((left / (remaining + left)) * 100).toFixed(2),
    retentionRate: ((left / remaining ) * 100).toFixed(2),
  }));

  // Formula :  divide the number of employees who left during a set period of time
  //  by the number of employees remaining during that time frame, then multiply that number by 100. 
  //  For example, if 10 employees left during a given time frame and 100 remained, your churn rate would be 10%

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

  return (
    <div className="w-full p-5 pt-6 bg-white rounded-lg shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-[22px] text-[#269F8B]">Employee Retention</h3>
        <div className="flex items-center space-x-12">
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
          <select className="px-2 py-1.5 text-md font-normal text-[#072D20] bg-white border border-gray-300 rounded-xl shadow-md cursor-pointer focus:outline-none">
            {Array.from({ length: 6 }, (_, i) => 2025 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <ComposedChart width={1200} height={300} data={calculatedData} margin={{ top: 60, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
  dataKey="month"
  tick={{ fontSize: 15, fill: "#4B5563", fontWeight: "500" }} 
  tickMargin={10} 
  padding={{ left: 50, right: 20 }} 
  axisLine={{ stroke: "#E5E7EB" }} 
  tickLine={false} 
/>
        <YAxis axisLine={false}
         tickLine={false}
          tick={{ fontSize: 15, fill: "#4B5563", fontWeight: "500" }} 
     
          tickFormatter={(value) => `${value}%`} />


<Tooltip 
  formatter={(value, name) => [`${value}%`, 'Retention Rate']}
  labelFormatter={(label) => `Month: ${label}`}
  contentStyle={{ 
    backgroundColor: "white", 
    border: "none", 
    borderRadius: "8px", 
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "8px 12px"
  }}
  separator=": "
/>

        <Line type="monotone" dataKey="retentionRate" stroke="#1f8675" strokeWidth={3} dot={{ r: 5 }} />
      </ComposedChart>
    </div>
  );
};

export default Graph;
