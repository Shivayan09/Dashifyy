import React from 'react'
import Sidebar from '../../components/Sidebar'
import ConstellationBackground from '../../components/ConstellationBackground'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex'>
        <div className="sidebar md:w-1/5">
          <Sidebar/>
        </div>
        <div className="box w-full md:w-4/5 h-screen overflow-y-auto">
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout
