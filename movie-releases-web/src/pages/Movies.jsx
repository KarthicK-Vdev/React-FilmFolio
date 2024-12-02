import React, { useEffect, useRef, useState } from 'react'
import MovieList from '../components/MovieList'
import { RiFolderCloseLine } from "react-icons/ri";
import {addNewMovie, getMovieYear} from "../services/apiCalls"

const Movies = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const month=[1,2,3,4,5,6,7,8,9,10,11,12];
  const [addMovie, setAddMovie]=useState(false);
  const [releaseDate, setReleaseDate] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [movieYear, setMovieYear] = useState([])
  const [yearDisplay, setYearDisplay] = useState(2024)

  const imageUrl=useRef()
  const movieName=useRef()
  const description=useRef()
  const actors=useRef()
  const director=useRef()

  const handleMovieData = async(e) =>{
      e.preventDefault()
      const actorArray=actors.current.value.split(",").map((actor)=>actor.trim());
      try {
        const response = await addNewMovie(imageUrl.current.value,movieName.current.value, releaseDate, description.current.value, actorArray, director.current.value)
        if(response.data.message==="added movie")
        {
          console.log(response.data)
          setAddMovie(!addMovie)
        }
        
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
    const fetchMovieYear=async ()=>{
      const {data}=await getMovieYear()
      setMovieYear(data)
    }
    fetchMovieYear()
  },[])
  

  const handleDateChange = (event) => {
    const dateValue = event.target.value; // In YYYY-MM-DD format
    setReleaseDate(dateValue);
};
  
  
  return (
    <>
    <div className='h-full w-full overflow-y-scroll flex flex-col items-center'>
      <div className='m-2 h-[10%] w-[100%] flex justify-end'>
        <div className='h-[80%] w-[100%] flex items-center'>{
            movieYear.map((data, index)=>(
              <button key={index} onClick={()=>setYearDisplay(data.year)} className='h-[100%] w-[10%] flex items-center justify-center mr-4 border-2 bg-yellow-100 text-yellow-700 border-yellow-400 rounded-md text-center'>{data.year}</button> 
            ))
          }
        </div>
        <button className='h-[100%] w-[25%] border-2 border-white bg-black text-yellow-400 font-bold text-lg rounded-md hover:bg-white hover:text-yellow-400 hover:border-yellow-400 transition duration-300' onClick={()=>setAddMovie(!addMovie)}>Add a Movie</button>
      </div>
      <div className='h-[80%] w-[90%] flex flex-col justify-center'>
        <div className='h-[100%]'>
          {
            month.map((data, index)=>(
              <div key={index} className=' flex flex-col'>
                <h1 className='font-semibold text-xl text-yellow-900'>{monthNames[data-1]}</h1>
                <MovieList month={data-1} year={yearDisplay} />
              </div>
            ))
          }

        </div>
      </div>
    </div>
    {
      addMovie && (
        <div className='h-screen w-screen absolute top-0 left-0 bg-black/20 flex justify-center items-center z-50'>
          <div className='h-[80%] w-[40%] border-2 border-black bg-white flex flex-col justify-between items-center'>
            <div className='h-[100%] w-[100%] flex flex-col justify-around items-center'>
            <div className='w-[80%] flex justify-between '>
              <div></div>
              <h1 className='h-[20%] font-bold text-2xl'>Add a Movie</h1>
              <RiFolderCloseLine onClick={()=>setAddMovie(!addMovie)} className='h-7' />
            </div>
            <form onSubmit={handleMovieData} className=' h-[80%] w-[100%] flex flex-col justify-around items-center '>
            <input className='h-[10%] w-[60%] p-2 bg-yellow-100 border-b-2 border-yellow-500' type='text'  placeholder="Image Url" required ref={imageUrl}></input>
                <input className='h-[10%] w-[60%] p-2 bg-yellow-100 border-b-2 border-yellow-500' type='text'  placeholder="Name" required ref={movieName}></input>
                <input
            className="h-[10%] w-[60%] p-2 bg-yellow-100 border-b-2 border-yellow-500"
            type={isFocused || releaseDate ? 'date' : 'text'}
            id="releaseDate"
            name="releaseDate"
            value={releaseDate} // Already in YYYY-MM-DD format
            onChange={handleDateChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Release Date"
            required
        />
                <input className='h-[10%] w-[60%] p-2 bg-yellow-100 border-b-2 border-yellow-500 ' type='text' placeholder="Description"
                required ref={description}
                ></input>
                <input className='h-[10%] w-[60%] p-2 bg-yellow-100 border-b-2 border-yellow-500' type='text'  placeholder="Actors" required ref={actors}></input>
                <input className='h-[10%] w-[60%] p-2 bg-yellow-100 border-b-2 border-yellow-500' type='text'  placeholder="Director" required ref={director}></input>

                <button type="submit" className='h-[10%] border-2 border-yellow-400 text-yellow-400 px-5 bg-white rounded-md hover:bg-black transition duration-300 hover:border-none'>Add</button>
            </form>
            </div>
          </div>
          
        </div>
      )
    }
    </>
  )
}

export default Movies