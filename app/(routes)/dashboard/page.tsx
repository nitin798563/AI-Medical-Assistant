import React from 'react'
import HistortList from './_component/HistorytList'
import { Button } from '@/components/ui/button'
import { DoctorsAgentList } from './_component/DoctorsAgentList'
import AddNewSessionDailog from './_component/AddNewSessionDailog'

const Dashboard = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl'>My Dashboard</h2>
     <AddNewSessionDailog/>
      </div>
      <HistortList/>
      <DoctorsAgentList/>
    </div>
  )
}

export default Dashboard