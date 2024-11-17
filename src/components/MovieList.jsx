import React from 'react'
import { MovieData } from '../Data/MovieData'

const MovieList = () => {
    const convertDate=(releseDate)=>{
        const date=new Date(releseDate)
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "long", // Full month name (e.g., "October")
            day: "numeric", // Day of the month (e.g., "17")
            year: "numeric" // Full year (e.g., "2023")
          });
          return formattedDate
    }
  return (
    <div className='h-full w-full flex flex-col justify-center items-center overflow-y-auto'>
        <div className='h-[90%] w-[90%]'>
            {
                MovieData.map((data, index)=>(
                    <div key={index} className='my-2 border-2 border-black h-[40%] w-full flex  items-center justify-around '>
                        <div className="h-[90%] w-[30%] border-2 border-black" >
                            <img></img>
                        </div>
                        <div className='border-2 border-black h-[90%] w-[60%] flex justify-center items-center'>
                            <div className='h-[90%] w-[90%]'>
                                <h1 className='text-2xl font-semibold ' >{data.name}</h1>
                                <h2>Release Date: {convertDate(data.releaseDate)}</h2>
                                <p>{data.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MovieList