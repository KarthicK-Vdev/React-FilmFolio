import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const WebLayout = () => {
  return (
    <div className='h-screen w-screen overflow-x-hidden overflow-y-hidden'>
        <div className='h-[10%]'><Navbar/></div>
        <div className='h-[90%]'><Outlet/></div>
    </div>
  )
}

export default WebLayout