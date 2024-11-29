import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-full w-full flex justify-center items-center bg-yellow-400'>
        <div className='h-[90%] w-[90%] flex justify-between items-center'>
        <NavLink to="/" className={({isActive})=>isActive ? "border-b-2 border-black" : ""}>FilmFolio</NavLink>
            <div className='flex p-2 w-[20%] justify-between'>
                <NavLink to="/login" className={({isActive})=>isActive ? "border-b-2 border-black" : ""}>Login</NavLink>
                <NavLink to="/movies" className={({isActive})=>isActive ? "border-b-2 border-black" : ""}>Movies</NavLink>
                <NavLink to="/analytics" className={({isActive})=>isActive ? "border-b-2 border-black" : ""}>Analytics</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar