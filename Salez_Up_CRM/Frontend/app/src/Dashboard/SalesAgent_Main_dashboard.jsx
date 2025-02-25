import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Agent_Sidebar from './Sidebars/Agent_Sidebar/Agent_Sidebar';
import PerformanceTable from './PerformanceTable';
import Intro from './Intro'
import My_Commission from './My_Commission'
import ContestSummary from './ContestSummary';
import  { Suspense } from "react";
import dataJson from '../Data.json';
import fetchAgents from '../Dashboard/My_Commission';




const SalesAgent_Main_dashboard = () => {
    
// Preloading Pages //


useEffect(() => {
    // Preload the route component before navigation
    import("../Dashboard/testing/Dashboard_Contest_Forecast");
   
  }, []);


const [summary, setSummary] = useState(() => {


    const savedSummary = localStorage.getItem('contestSummary');
    if (savedSummary) {
      return JSON.parse(savedSummary);
    }
    return {
      contests: 2,
      points: 200,
      totalPrizes: 150,
      prizes: [
        { name: 'Cash', amount: 50, iconSrc: '/images/cash.png' },
        { name: 'Vouchers', amount: 50, iconSrc: '/images/voucher.png' },
        { name: 'Food', amount: 50, iconSrc: '/images/food.png' },
        { name: 'Experiences', amount: 0, iconSrc: '/images/experience.png' }
      ],
      timeStats: {
        icon: 'images/time.png',
        label: 'Time',
        value: 2
      },
      monthStats: {
        icon: 'images/bag.png',
        label: 'This Month',
        value: 200
      }
    };
  });

  useEffect(() => {
    const summaryJSON = {
      time: summary.timeStats.value,
      thisMonth: summary.monthStats.value,
      contests: summary.contests,
      points: summary.points,
      totalPrizes: summary.totalPrizes,
      prizes: {
        cash: summary.prizes[0].amount,
        vouchers: summary.prizes[1].amount,
        food: summary.prizes[2].amount,
        experiences: summary.prizes[3].amount
      }
    };
    localStorage.setItem('contestSummary', JSON.stringify(summary));
  }, [summary]);


  useEffect(() => {
    const total = summary.prizes.reduce((sum, prize) => sum + prize.amount, 0);
    setSummary(prev => ({ ...prev, totalPrizes: total }));
  }, [summary.prizes]);




///////////////////////Actual Page ////////////////////

const processValue = (value) => {
    // Remove currency signs
    let cleanedValue = value.replace(/[£$€]/g, '').replace(/,/g, '');
    
    // Convert percentage to decimal
    if (value.includes('%')) {
        cleanedValue = (parseFloat(cleanedValue) / 100).toFixed(2);
    }
    
    // Convert to number if possible, otherwise return as string
    return isNaN(parseFloat(cleanedValue)) ? cleanedValue : parseFloat(cleanedValue);
};

const [tableData, setTableData] = useState([]);

useEffect(() => {
    const storedData = localStorage.getItem('tableData1');
    
    if (storedData) {
        setTableData(JSON.parse(storedData));
    } else {
        // Process the data from dataJson
        const extractedData = Object.keys(dataJson).map(dayKey => {
            const dayData = dataJson[dayKey];
            const dayName = Object.keys(dayData)[0];  // Get the day name (Monday, Tuesday, etc.)
            const values = Object.values(dayData)[0];  // Get the array of values
            
            // Process each value
            const processedValues = values.map(processValue);
            
            return { dayName, values: processedValues };
        });

        localStorage.setItem('tableData1', JSON.stringify(extractedData));
        setTableData(extractedData);
    }
}, []);



/////////////////////////////////////////////////////////////////////////////////


    
    const [localStorageData, setLocalStorageData] = useState([]);

    const processWeekdayData = (localData) => {
        const aggregatedData = [];

        // Group data by agent
        const agentGroups = localData.reduce((acc, item) => {
            if (!acc[item.agentName]) {
                acc[item.agentName] = [];
            }
            acc[item.agentName].push(...item.days);
            return acc;
        }, {});

        // Process each agent's data
        Object.entries(agentGroups).forEach(([agentName, days]) => {
            // Group days by weekday
            const weekdayGroups = days.reduce((acc, day) => {
                if (!acc[day.dayName]) {
                    acc[day.dayName] = [];
                }
                acc[day.dayName].push(day.values);
                return acc;
            }, {});

            // Calculate aggregated values for each position across weekdays
            const numValues = days[0]?.values.length || 0;
            const aggregatedValues = Array(numValues).fill(0).map((_, valueIndex) => {
                const sum = Object.values(weekdayGroups).reduce((acc, weekdayValues) => {
                    return acc + weekdayValues.reduce((sum, values) => sum + parseFloat(values[valueIndex]), 0);
                }, 0);
                return sum; // Sum across weekdays instead of averaging
            });

            // Calculate aggregatedValues[4] as (aggregatedValues[2] / aggregatedValues[3] * 100)
            aggregatedValues[4] = (aggregatedValues[3] / aggregatedValues[2] * 100) || 0;

            aggregatedData.push({
                agentName,
                aggregatedValues
            });
        });

        localStorage.setItem("aggregated data", JSON.stringify(aggregatedData));
        return aggregatedData;
    };

    useEffect(() => {
        const a = processWeekdayData(localStorageData);
    }, [
    ])

    const fetchLocal = () => {
        const extractedTableData = localStorage.getItem('tableData');
        if (extractedTableData) {
            const parsedData = JSON.parse(extractedTableData);
            setLocalStorageData(parsedData);
            const processed = processWeekdayData(parsedData);
            // setAggregatedData(processed);
            console.log("Processed data:", processed);
        }
    };

    useEffect(() => {
        fetchLocal();
        const handleStorageChange = (event) => {
            if (event.key === 'tableData') {
                fetchLocal();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


///////////////////////////////////////////////////////////////////////////////////// 




// const [forcastPrize, setForcastPrize] = useState("");

// useEffect(() => {
//   const updatePrize = () => {
//     const mydata = localStorage.getItem("contestSummary");

//     if (mydata) {
//       try {
//         const parsedData = JSON.parse(mydata);
//         console.log("Contest Data:", parsedData);

//         if (parsedData.totalPrizes !== undefined) {
//           setForcastPrize(parsedData.totalPrizes);
//           console.log("Total Prize:", parsedData.totalPrizes);
//         }
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//       }
//     }
//   };

//   updatePrize();

//   // Listen for changes in localStorage
//   window.addEventListener("storage", updatePrize);

//   return () => {
//     window.removeEventListener("storage", updatePrize);
//   };
// }, []);





























/////////////////////////////////////////////////////////////////////////////////////////////////////////









    return (
        <div className='mx-2'>




            <Navbar />
            <div className='flex flex-row w-full'>
                <div className="w-[21%]">
                    <Agent_Sidebar/>
                </div>
                <div className="w-[79%] flex flex-col overflow-hidden">
                    <Intro />
           
                    <My_Commission  />
                    <PerformanceTable />
                    <ContestSummary />
                </div>

            </div >
        </div >
    );
};


export default SalesAgent_Main_dashboard;