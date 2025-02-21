
import React, { useState } from "react";
import MetricCards from "./MetricCard";
import { ChevronDown } from "lucide-react";


export default function Summary() {
    // const [date, setDate] = React.useState(() => {
    // const today = new Date();
    // const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    //       .toISOString()
    //       .split('T')[0];
    //     return localDate;
    // });

// Date picker //


const [startDate, setStartDate] = useState(() => {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return localDate;
});

const [endDate, setEndDate] = useState(() => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const localDate = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return localDate;
});

const handleStartDateChange = (e) => {
  const newStartDate = e.target.value;
  setStartDate(newStartDate);
  
  // If end date is before or equal to new start date, set end date to day after new start date
  if (new Date(endDate) <= new Date(newStartDate)) {
    const nextDay = new Date(new Date(newStartDate).getTime() + 24 * 60 * 60 * 1000);
    const localNextDay = new Date(nextDay.getTime() - nextDay.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    setEndDate(localNextDay);
  }
};

const handleEndDateChange = (e) => {
  const newEndDate = e.target.value;
  // Only allow end date to be set if it's after start date
  if (new Date(newEndDate) > new Date(startDate)) {
    setEndDate(newEndDate);
  }
};


// --- Date module ended ---//


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
    <div className="w-full bg-white rounded-lg shadow-2xl">
    <div className="flex flex-col w-full gap-8">
    <div className="flex flex-col w-full gap-6 p-5 pb-12 ">
          
    <h1 className=" leading-[33px]  text-[#269F8B] font-medium text-[22px]">Summary</h1>

    {/* Date Picker & Campaigns Row */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">

{/* <div className="flex flex-row p-4 space-x-6 ">

  <div className="relative flex flex-col">
    <label className="mx-auto mb-1 text-sm font-medium text-[#1e8675] ">Starting Date</label>
    <div className="relative">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        ref={(input) => (window.startDateInput = input)}
        className="w-full px-3 py-2 border border-[#F7F7FF] rounded-xl bg-[#F7F7FF] text-center cursor-pointer font-500 text-[#072D20]/50 pr-10"
      />
      <img
        src="/images/hr_dashboard_img/date_picker.png"
        alt="Date Picker"
        className="absolute w-5 h-5 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
        onClick={() => window.startDateInput.showPicker()}
      />
    </div>
  </div>


  <div className="relative flex flex-col">
    <label className="mx-auto mb-1 text-sm font-medium text-[#1e8675] ">Ending Date</label>
    <div className="relative">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        ref={(input) => (window.endDateInput = input)}
        className="w-full px-3 py-2 border border-[#F7F7FF] rounded-xl bg-[#F7F7FF] text-center cursor-pointer font-500 text-[#072D20]/50 pr-10"
      />
      <img
        src="/images/hr_dashboard_img/date_picker.png"
        alt="Date Picker"
        className="absolute w-5 h-5 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
        onClick={() => window.endDateInput.showPicker()}
      />
    </div>
  </div>
</div> */}





<div className="flex flex-row p-4 space-x-6">
      {/* Starting Date */}
      <div className="relative flex flex-col">
        <label className="mx-auto mb-1 text-sm font-medium text-[#1e8675]">
          Starting Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            ref={(input) => (window.startDateInput = input)}
            className="w-full px-3 py-2 border border-[#F7F7FF] rounded-xl bg-[#F7F7FF] text-center cursor-pointer font-medium text-[#072D20]/50 pr-10"
          />
          <img
            src="/images/hr_dashboard_img/date_picker.png"
            alt="Date Picker"
            className="absolute w-5 h-5 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
            onClick={() => window.startDateInput.showPicker()}
          />
        </div>
      </div>

      {/* Ending Date */}
      <div className="relative flex flex-col">
        <label className="mx-auto mb-1 text-sm font-medium text-[#1e8675]">
          Ending Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            ref={(input) => (window.endDateInput = input)}
            className="w-full px-3 py-2 border border-[#F7F7FF] rounded-xl bg-[#F7F7FF] text-center cursor-pointer font-medium text-[#072D20]/50 pr-10"
          />
          <img
            src="/images/hr_dashboard_img/date_picker.png"
            alt="Date Picker"
            className="absolute w-5 h-5 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
            onClick={() => window.endDateInput.showPicker()}
          />
        </div>
      </div>
    </div>

            
      
      {/* <div className="flex items-center gap-3">
      <button
        onClick={() => setSelectedCampaign(null)}
        className={`p-2 px-4 rounded-lg border shadow-md ${
          selectedCampaign === null ? "bg-white text-[#009245] " : "bg-white text-gray-400"
        }`}
      >
        ALL
      </button>

      {campaigns.map((campaign) => (
        <button
          key={campaign.id}
          onClick={() => setSelectedCampaign(campaign.id)}
          className="p-2 rounded-md"
        >
          <img
            src={campaign.image}
            alt={campaign.name}
            className={`h-10 w-10 object-contain transition-opacity ${
              selectedCampaign === campaign.id ? "opacity-100" : "opacity-40"
            }`}
          />
        </button>
      ))}
    </div> */}




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
{/* Date Picker & Campaigns Row */}


<MetricCards />

        </div>
      </div>
    </div>
  );
}
