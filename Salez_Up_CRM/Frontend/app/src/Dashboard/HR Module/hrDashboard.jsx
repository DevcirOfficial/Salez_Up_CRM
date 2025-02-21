import React from 'react'


// Sidebar //

import HRSidebar from '../Sidebars/Teamleader_Sidebar/Teamleader_Sidebar';

// Navbar //

import Navbar from '../../components/Navbar';

import { Toaster } from 'sonner';

// Component //


import IntroDiv from './Components/IntroDiv';
import GenderAndAge from './Components/GenderAndAge';
import Penalty from './Components/Penalty';
import Commission_Sign_Off from './Components/PenaltyTable';
import CommissionChart from './Components/CommissionChart';
import HeadCountGraph from './Components/HeadCountGraph';

const hrDashboard = () => {
  return (
    <div>
        <Navbar/>
   

<div className='flex flex-row w-full h-screen '>


<div className='w-[18%] p-2.5'>
    <HRSidebar/>
</div>

<div  className='w-[82%]  p-4 bg-white space-y-12 -mt-6'>

<Toaster />
<IntroDiv/>
<GenderAndAge/>
<CommissionChart/>
<HeadCountGraph/>

<Penalty/>

<Commission_Sign_Off />

<br/>
<br/>

</div>


</div>

    </div>
  )
}

export default hrDashboard
