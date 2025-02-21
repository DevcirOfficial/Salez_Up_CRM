import React, { useState } from 'react';
import { PenSquare } from 'lucide-react';
import { ChevronDown,ChevronLeft,ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Commission_Sign_Off = () => {
  const teams = ['All teams', 'Inbound', 'Outbound', 'Vetting', 'BDR'];
  
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [secondPosition, setSecondPosition] = useState(teams[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [animationDirection, setAnimationDirection] = useState(0);
  
  const handleTeamSelect = (selectedTeam) => {
    setSecondPosition(selectedTeam);
    setActiveTeam(selectedTeam);
    setIsDropdownOpen(false);
  };
  
  const getDropdownTeams = () => {
    return teams.filter(team => team !== 'All teams' && team !== secondPosition);
  };
  const dropdownTeams = getDropdownTeams();
  const hasMoreTeams = teams.length > 2;
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isCampaignDropdownOpen, setIsCampaignDropdownOpen] = useState(false);
  const [orderedCampaigns, setOrderedCampaigns] = useState([
    { id: 1, name: "Coke", image: "/images/coke.png" },
    { id: 2, name: "Lipton", image: "/images/lipton.png" },
    { id: 4, name: "Vodafone", image: "/images/vodafone.png" },
    { id: 3, name: "Three", image: "/images/3campaign.png" }
  ]);
  const handleCampaignSelect = (campaign, isFromDropdown) => {
    setSelectedCampaign(campaign);
    
    if (isFromDropdown) {
      const newOrder = [
        campaign,
        ...orderedCampaigns.filter(c => c.id !== campaign.id)
      ];
      setOrderedCampaigns(newOrder);
    }
    setIsCampaignDropdownOpen(false);
  };
  const visibleCampaigns = orderedCampaigns.slice(0, 3);
  const dropdownCampaigns = orderedCampaigns.slice(3);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("Team Leader");
  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      toast.success('Successfully Updated Records', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const commissionsData = [
    {
      id: 1,
      avatar: '/images/dashboard_img1.png',
      name: 'Sarah',
      surname: 'Smart',
      campaign: 'Coca Cola',
      team: 'Inbound',
      role: 'Team Leader',
      commission: 1500,
      penalty: 'N/A',
      finalCommission: 1500,
      approved: true
    },
    {
      id: 2,
      avatar: '/images/dashboard_img2.png',
      name: 'Mary',
      surname: 'Hill',
      campaign: 'Coca Cola',
      team: 'Inbound',
      role: 'Sales Agent',
      commission: 1000,
      penalty: 'N/A',
      finalCommission: 1000,
      approved: true
    },
    {
      id: 3,
      avatar: '/images/dashboard_img1.png',
      name: 'Max',
      surname: 'Holds',
      campaign: 'Lipton',
      team: 'Outbound',
      role: 'Sales Agent',
      commission: 900,
      penalty: 'Final Warning',
      finalCommission: 0,
      approved: true
    },
    {
      id: 4,
      avatar: '/images/dashboard_img2.png',
      name: 'John',
      surname: 'Doe',
      campaign: 'Vodafone',
      team: 'Outbound',
      role: 'Team Leader',
      commission: 1800,
      penalty: 'N/A',
      finalCommission: 1800,
      approved: true
    }
  ];

  const getFilteredData = () => {
    let filtered = [...commissionsData];
    if (selected === "Team Leader") {
      filtered = filtered.filter(item => item.role === "Team Leader");
    } else if (selected === "Sales Agent") {
      filtered = filtered.filter(item => item.role === "Sales Agent");
    }
    if (activeTeam !== 'All teams') {
      filtered = filtered.filter(item => item.team === activeTeam);
    }
    if (selectedCampaign) {
      filtered = filtered.filter(item => item.campaign === selectedCampaign.name);
    }
    return filtered;
  };

  const filteredData = getFilteredData();
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    setAnimationDirection(pageNumber > currentPage ? 1 : -1);
    setCurrentPage(pageNumber);
  };

  const tableVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <div className='flex flex-col w-full gap-8 mt-8 bg-white'>
      <div className="flex flex-col w-full gap-6 p-8 pb-12 rounded-lg shadow-2xl">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <h1 className="font-poppins font-medium text-[22px] text-[#269F8B]">Commission Sign Off</h1>
            <span className="font-poppins text-[14px] text-[#666666] font-medium">Mar 2024</span>
          </div>
          <div className="w-[30%] flex flex-row space-x-6 ml-16">
            <button
              onClick={() => setSelected("Team Leader")}
              className={`px-2.5 py-1.5 rounded-lg text-sm  ${
                selected === "Team Leader" ? "bg-[#188674] text-white" : "bg-[#feffff] text-[#afafaf] shadow-xl"
              }`}
            >
              Team Leader
            </button>
            <button
              onClick={() => setSelected("Sales Agent")}
              className={`px-2.5 py-1.5 rounded-lg text-sm  ${
                selected === "Sales Agent" ? "bg-[#188674]  text-white" : "bg-[#feffff] text-[#afafaf] shadow-xl"
              }`}
            >
              Sales Agent
            </button>
          </div>
          <div className="flex items-center gap-3 ">
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
                className="p-2.5 "
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
                  <div className="absolute left-0 mt-1 py-1 bg-white rounded-lg shadow-lg min-w-[120px] z-10">
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
                            selectedCampaign?.id === campaign.id ? "opacity-100" : "opacity-40"
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
        <div className="flex items-center justify-between mb-2 ">
          {/* <div className="flex gap-2 bg-red-500">
            <button
              onClick={() => setActiveTeam('All teams')}
              className={`px-4 py-1.5 rounded-[10px] text-sm transition-colors
                ${activeTeam === 'All teams' 
                  ? 'bg-[#1E8675] text-[#FFFFFF] font-poppins' 
                  : 'bg-[#F8FDFC] text-[#072D20] hover:bg-[#F8FDFC] border border-[#F8FDFC] font-poppins'}`}
            >
              All teams
            </button>
            <button
              onClick={() => setActiveTeam(secondPosition)}
              className={`px-4 py-1.5 rounded-[10px] text-sm transition-colors
                ${activeTeam === secondPosition 
                  ? 'bg-[#1E8675] text-[#FFFFFF] font-poppins' 
                  : 'bg-[#F8FDFC] text-[#072D20] hover:bg-[#F8FDFC] border border-[#F8FDFC] font-poppins'}`}
            >
              {secondPosition}
            </button>
            {hasMoreTeams && (
              <div className="relative ">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-4 py-1.5 rounded-[10px] text-sm bg-[#F8FDFC] text-[#072D20] hover:bg-[#F8FDFC] border border-[#F8FDFC] font-poppins flex items-center gap-1"
                >
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1 py-1 bg-white rounded-[10px] shadow-lg border border-[#F8FDFC] min-w-[120px] z-10">
                    {dropdownTeams.map((team) => (
                      <button
                        key={team}
                        onClick={() => handleTeamSelect(team)}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#F8FDFC] font-poppins
                          ${activeTeam === team ? 'bg-[#F8FDFC] text-[#072D20]' : 'text-[#072D20]'}`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div> */}
          <div className="flex gap-2 ">
  <button
    onClick={() => {
      setActiveTeam("All teams");
      setIsDropdownOpen(false);
    }}
    className={`px-4 py-1.5 rounded-[10px] text-sm transition-colors
      ${activeTeam === "All teams"
        ? "bg-[#1E8675] text-[#FFFFFF] font-poppins"
        : "bg-[#F8FDFC] text-[#072D20] hover:bg-[#F8FDFC] border border-[#F8FDFC] font-poppins"}`}
  >
    All teams
  </button>

  <button
    onClick={() => {
      setActiveTeam(secondPosition);
      setIsDropdownOpen(false);
    }}
    className={`px-4 py-1.5 rounded-[10px] text-sm transition-colors
      ${activeTeam === secondPosition
        ? "bg-[#1E8675] text-[#FFFFFF] font-poppins"
        : "bg-[#F8FDFC] text-[#072D20] hover:bg-[#F8FDFC] border border-[#F8FDFC] font-poppins"}`}
  >
    {secondPosition}
  </button>

  {hasMoreTeams && (
    <div className="relative">
      <button
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          setActiveTeam(null); // Deselect other buttons
        }}
        className={`px-4 py-1.5 rounded-[10px] text-sm font-poppins flex items-center gap-1 transition-colors
          ${isDropdownOpen
            ? "bg-[#1E8675] text-[#FFFFFF]"
            : "bg-[#F8FDFC] text-[#072D20] hover:bg-[#F8FDFC] border border-[#F8FDFC]"}`}
      >
        More
        <ChevronDown className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 py-1 bg-white rounded-[10px] shadow-lg border border-[#F8FDFC] min-w-[120px] z-10">
          {dropdownTeams.map((team) => (
            <button
              key={team}
              onClick={() => {
                handleTeamSelect(team);
                setIsDropdownOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#F8FDFC] font-poppins
                ${activeTeam === team ? "bg-[#F8FDFC] text-[#072D20]" : "text-[#072D20]"}`}
            >
              {team}
            </button>
          ))}
        </div>
      )}
    </div>
  )}
</div>

          <div className="flex flex-row w-[47%] items-center justify-center space-x-4 p-2 -mt-1.5">
            <div className="relative w-[370px] h-[38px] ">
              <img
                src="/images/hr_dashboard_img/search_icon.png"
                alt="Search Icon"
                className="absolute w-6 h-6 -translate-y-1/2 left-[30%] top-1/2"
              />
              <input
                type="text"
                placeholder="Search Name"
                className="w-full h-full pl-10 pr-4 input-search rounded-full text-center  bg-[#F7F7FF] text-[14px] text-[#072D20] font-poppins outline-none focus:ring-0"
              />
            </div>
            <button className="flex items-center gap-1 w-[108px] h-[40px] rounded-[10px] bg-[#FFFFFF] text-[#009245] font-poppins text-[14px] shadow-xl shadow-[#409084]/10 px-[15px]">
              <img
                src="/images/hr_dashboard_img/export.png"
                alt="Export Icon"
                className="w-6 h-6"
              />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#82BF9F] border-dashed">
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2"></th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Name</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4py-2">Surname</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Campaign</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Team</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Role</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Commission</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Penalty</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2">Final Commission</th>
                <th className="font-medium text-[#1E8675] font-poppins text-[14px] pb-2 px-4 py-2"></th>
              </tr>
            </thead>
            <AnimatePresence mode="wait" custom={animationDirection}>
              <motion.tbody
                key={currentPage}
                custom={animationDirection}
                variants={tableVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className='border-b-2 border-[#82BF9F] border-dashed'
              >
                {currentRecords.map((row) => (
                  <tr key={row.id} className='border-b-2 border-[#82BF9F] border-dashed'>
                    <td className="text-center border-l-2 border-[#82BF9F] border-dashed">
                      <div className="flex items-center justify-center gap-2">
                        <img 
                          src={row.avatar} 
                          alt={`${row.name}'s avatar`}
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center px-4 py-2">{row.name}</td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center px-4 py-2">{row.surname}</td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center px-4 py-2">{row.campaign}</td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center px-4 py-2">{row.team}</td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center px-4 py-2">{row.role}</td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center px-4 py-2">${row.commission}</td>
                    <td className="font-poppins text-[14px] text-[#333333] text-center pt-4 px-2 py-2 justify-between pl-6 w-full items-center mx-auto flex flex-row">
                      <span>{row.penalty}</span>
                      <img src="/images/hr_dashboard_img/drown_arrow.png" alt="Dropdown" className="w-5 h-5" />
                    </td>
                    <td className="px-4 py-2 text-sm text-center text-gray-600">${row.finalCommission}</td>
                    <td className="px-4 py-2 text-center border-r-2 border-[#82BF9F] border-dashed">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <img src="/images/hr_dashboard_img/edit_btn.png" alt="Edit" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination and Approve All section */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Approve All</span>
            <div
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ease-in-out ${
                isActive ? 'bg-[#1a8678]' : 'bg-gray-200'
              }`}
              onClick={handleToggle}
              role="switch"
              aria-checked={isActive}
              tabIndex={0}
            >
              <div
                className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all duration-200 ease-in-out ${
                  isActive ? 'right-1' : 'left-1'
                }`}
              />
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#F8FDFC] text-[#072D20] hover:bg-[#1E8675] hover:text-white'
              }`}
            >
             <ChevronLeft size={20} />
            </button>
            
            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === number 
                    ? 'bg-[#1E8675] text-white' 
                    : 'bg-[#F8FDFC] text-[#072D20] hover:bg-[#1E8675] hover:text-white'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#F8FDFC] text-[#072D20] hover:bg-[#1E8675] hover:text-white'
              }`}
            >
            <ChevronRight size={20}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission_Sign_Off;