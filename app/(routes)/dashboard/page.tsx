import React from 'react'
import HistortList from './_component/HistorytList'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl'>My Dashboard</h2>
      <Button>+Consult With Doctor</Button>
      </div>
      <HistortList/>
    </div>
  )
}

export default Dashboard