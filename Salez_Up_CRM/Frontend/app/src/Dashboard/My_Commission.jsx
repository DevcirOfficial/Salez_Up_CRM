import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faLock } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Actual_Vs_Target_logic from "./testing/Actual_Vs_Target_logic";

const My_Commission = () => {
    ////////////////////////////////////////////////////////// Prize logic ////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////// Prize Money ////////////////////////////////////////////////////////////////
    



    const [forcastPrize, setForcastPrize] = useState("");
    
    useEffect(() => {
      const updatePrize = () => {
        const mydata = localStorage.getItem("contestSummary");
    
        if (mydata) {
          try {
            const parsedData = JSON.parse(mydata);
            console.log("Contest Data:", parsedData);
    
            if (parsedData.totalPrizes !== undefined) {
              setForcastPrize(parsedData.totalPrizes);
              console.log("Total Prize:", parsedData.totalPrizes);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };
    
      updatePrize();
    
      // Listen for changes in localStorage
      window.addEventListener("storage", updatePrize);
    
      return () => {
        window.removeEventListener("storage", updatePrize);
      };
    }, []);


    
 
    
    // Initialize state with data from localStorage immediately
    const initPerformanceTable = JSON.parse(localStorage.getItem('Performace Table') || '[]');
    const initAggregatedData = JSON.parse(localStorage.getItem('aggregated data') || '[]');
    const initContestData = JSON.parse(localStorage.getItem('contestSummary') || '{"totalPrizes": 0}');
    
    // Set fixed commission value of 100
    const initialCommission = "100";
    
    // Calculate initial total commission (fixed commission + forecast prize)
    const initialTotalCommission = (parseFloat(initialCommission) + parseFloat(initContestData?.totalPrizes || 0)).toFixed(2);
    const [activeButton, setActiveButton] = useState("Current Month");
    const [commission, setCommission] = useState(initialCommission);
    const [currency, setCurrency] = useState('$');
    const [allowedButton, setAllowedButton] = useState('Current Month'); // Default to Current Month
    const [agents, setAgents] = useState([]);
    const [mainAgent, setMainAgent] = useState([]);
    const [aggregatedData, setAggregatedData] = useState(initAggregatedData);
    const [contestData, setContestData] = useState(initContestData);
    const [totalCommission, setTotalCommission] = useState(initialTotalCommission);
    const [gatekeeperTargetData, setGatekeeperTargetData] = useState(null);
    const [showLock, setShowLock] = useState(false);
    const [lastMonthCommission, setLastMonthCommission] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);
    
    // Initial contribution data calculation
    const calculateContributionData = () => {
        // Fixed commission value of 100
        const commissionValue = 100;
        const contestValue = parseFloat(forcastPrize) || 0;
        const total = commissionValue + contestValue;
        
        const myCommission = total > 0 ? parseFloat((commissionValue / total * 100).toFixed(1)) : 0;
        const myPercentage = total > 0 ? parseFloat((contestValue / total * 100).toFixed(1)) : 0;
        
        return [
            { name: 'Commission', amount: commissionValue, percentage: myCommission, color: '#009245' },
            { name: 'Contests', amount: forcastPrize, percentage: myPercentage, color: '#A4D837' },
            { name: 'Team Rank', amount: 'N/A', percentage: 0, color: '#FFC107' },
        ];
    };
    
    const [data, setData] = useState(calculateContributionData());
    const buttons = ["Current Month", "Custom"];
    
    // Fetch agents immediately on component mount
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const teamId = localStorage.getItem('Team_id');
                console.log(teamId)
                if (!teamId) {
                    console.warn("Team ID not found in localStorage");
                    return;
                }
                
                const response = await fetch(`http://127.0.0.1:8000/api/sales_agents/team/${teamId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Data Coming Now", data)
                
                const formattedAgents = data.map((agent, index) => {
                    try {
                        const kpiData = agent.kpi_data ? JSON.parse(agent.kpi_data) : { kpiData: [null, { target: 0 }], teamInfo: { opportunity: 0 } };
                        const target = kpiData?.kpiData?.[1]?.target || 0;
                        
                        // Safely access aggregatedData
                        const actualValue = (aggregatedData && 
                                            aggregatedData[index] && 
                                            aggregatedData[index].aggregatedValues && 
                                            aggregatedData[index].aggregatedValues[1]) || 0;
                        
                        const targetPercentage = target > 0 ? (actualValue / target) * 100 : 0;
                        const opportunity = kpiData?.teamInfo?.opportunity || 0;
                        
                        return {
                            id: agent.id,
                            name: `${agent.first_name} ${agent.last_name}`,
                            opportunity: opportunity,
                            targetPercentage,
                            rank: 0,
                            score: target,
                            target: target,
                            actual: actualValue,
                            image: agent.image_path,
                        };
                    } catch (error) {
                        console.error("Error processing agent data:", error);
                        return {
                            id: agent.id,
                            name: `${agent.first_name} ${agent.last_name}`,
                            opportunity: 0,
                            targetPercentage: 0,
                            rank: 0,
                            score: 0,
                            target: 0,
                            actual: 0,
                            image: agent.image_path,
                        };
                    }
                });
                
                // Calculate rankings
                const topAgents = formattedAgents
                    .sort((a, b) => b.opportunity - a.opportunity)
                    .map((agent, index) => ({
                        ...agent,
                        rank: index + 1,
                        target: `${agent.targetPercentage.toFixed(2)}%`,
                    }));
                
                setAgents(topAgents);
                
                // Find current agent
                const agentId = localStorage.getItem('id');
                const foundAgent = topAgents.find(agent => agent.id == agentId);
                if (foundAgent) {
                    setMainAgent([foundAgent]);
                }
                
                // Process gatekeeper data
                const gatekeeperRow = initPerformanceTable.find(row => row?.gatekeeperTarget && row.gatekeeperTarget !== "-");
                if (gatekeeperRow) {
                    setGatekeeperTargetData(gatekeeperRow);
                    getLock(gatekeeperRow);
                }
                
                // Update data with rank information
                updateDataWithRank(topAgents, foundAgent ? [foundAgent] : []);
                
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };
        
        // Set frequency/button
        const frequency = localStorage.getItem('frequency_salesagent');
        const frequencyToButton = {
            'Monthly': 'Current Month',
            'Quaterly': 'Quarter',
            'Weekly': 'Week'
        };
        
        if (frequency && frequencyToButton[frequency]) {
            setActiveButton(frequencyToButton[frequency]);
            setAllowedButton(frequencyToButton[frequency]);
        }
        fetchAgents();
    }, []);

           
        // Fixed commission value of 100
        const commissionValue = 190;
    
    // Helper function to update data with rank information
    const updateDataWithRank = (agentsList, currentAgent) => {
        if (!agentsList.length || !currentAgent.length) return;
 
        const contestValue = parseFloat(forcastPrize || 0) || 0;
        const total = commissionValue + contestValue;
        
        const myCommission = total > 0 ? parseFloat((commissionValue / total * 100).toFixed(1)) : 0;
        const myPercentage = total > 0 ? parseFloat((contestValue / total * 100).toFixed(1)) : 0;
        const rankPercentage = 100 - (currentAgent[0]?.rank / agentsList.length * 100);
        
        setData([
            { name: 'Commission', amount: commissionValue, percentage: myCommission, color: '#009245' },
            { name: 'Contests', amount: contestValue, percentage: myPercentage, color: '#A4D837' },
            { name: 'Team Rank', amount: currentAgent[0]?.rank || 'N/A', percentage: rankPercentage, color: '#FFC107', max: agentsList.length },
        ]);
    };
    
    // Update data when relevant state changes
    useEffect(() => {
        // Fixed commission value of 100

        const contestValue = parseFloat(forcastPrize || 0) || 0;
        setTotalCommission((commissionValue + contestValue).toFixed(2));
        
        if (mainAgent.length > 0 && agents.length > 0) {
            updateDataWithRank(agents, mainAgent);
        }
    }, [forcastPrize, mainAgent, agents]);
    
    // Handle button click
    const handleButtonClick = (label) => {
        if (label !== allowedButton) return;
        setActiveButton(label);
    };
    
    // Calculate lock status
    const getLock = (gatekeeperTargetDatas) => {
        if (!gatekeeperTargetDatas) return;
        
        try {
            const actual = parseFloat(gatekeeperTargetDatas.actual || 0);
            const target = parseFloat(gatekeeperTargetDatas.target || 1);
            const gatekeeperTarget = parseFloat(gatekeeperTargetDatas.gatekeeperTarget || 0);
            
            const percentage = (actual / target) * 100;
            setShowLock(percentage <= gatekeeperTarget);
        } catch (error) {
            console.error("Error calculating lock status:", error);
            setShowLock(false);
        }
    };
 
    useEffect(() => {
        getLock(gatekeeperTargetData);
    }, [gatekeeperTargetData]);
    











    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    return (
        <>
            <div className='w-auto mt-8 p-4 flex flex-col gap-[32px] mb-4'>
                <div
                    className="flex flex-col w-auto gap-6 p-8 pb-12 card"
                    style={{
                        background: "linear-gradient(to right, #f4fefe, transparent)",
                    }}
                >
                    <h1 className='font-[500] leading-[33px] text-3xl text-[#269F8B] '>My Commission</h1>
                    <div className="flex w-auto gap-4">
                        <div className="flex-1 p-4 bg-white shadow-lg rounded-2xl">
                            <div className="flex items-center justify-between mt-4 ">
                                <h2 className="text-2xl text-[#009245]">Total Commission</h2>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faCaretUp} className="text-[#009245]" />
                                    <span className="text-[#009245] text-2xl font-semibold ml-2">{percentageChange}%</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-3xl font-semibold text-[#1E8675]">{currency}{totalCommission}</p>
                                <p className="text-mm text-[#5F5E5E]">vs {currency}{lastMonthCommission} last month</p>
                            </div>
                            <div className="flex mt-12 justify-evenly">
                                {buttons.map((label) => (
                                    <button
                                        key={label}
                                        onClick={() => handleButtonClick(label)}
                                        disabled={label !== allowedButton}
                                        className={`px-4 py-1 border-2 rounded-lg text-lg 
                                            ${activeButton === label
                                                ? "border-[#1E8675] text-[#009245]"
                                                : "border-[#E5E5E5] text-[#072D20]"
                                            }
                                            ${label !== allowedButton
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 p-6 bg-white shadow-lg rounded-xl">
                            <div className="flex items-start justify-between px-4 mt-2">
                                {data.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center ">
                                        <p className="text-lg text-[#009245]">
                                            {item.name}
                                        </p>
                                        <p className="text-lg text-[#1E8675] font-semibold mb-1">
                                            {item.name === 'Team Rank' ? item.amount : `$${item.amount}`}
                                        </p>
                                        <div className="relative w-24 h-24 mt-4">
                                            <CircularProgressbar
                                                value={item.percentage || 0}
                                                text={item.name === 'Team Rank' ? 
                                                      (mainAgent?.length > 0 ? `${mainAgent[0]?.rank || '-'} / ${agents.length || '-'}` : 'N/A') : 
                                                      `${item.percentage || 0}%`}
                                                styles={buildStyles({
                                                    pathColor: item.color,
                                                    textColor: item.color,
                                                    trailColor: '#f0f0f0',
                                                    textSize: '22px',
                                                    pathTransitionDuration: 0.5,
                                                    strokeWidth: 4,
                                                })}
                                                strokeWidth={4}
                                            />
                                            {showLock && index === 0 && (
                                                <div className="w-full h-full flex items-center justify-center pt-12 -mt-[96px] bg-black/25 rounded-full">
                                                    <FontAwesomeIcon icon={faLock} className="text-lg text-black/70" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Actual_Vs_Target_logic/>
                </div>
            </div>
        </>
    )
}

export default My_Commission;