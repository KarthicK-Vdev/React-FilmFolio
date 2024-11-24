import React, { useState } from 'react'
import MovieList from '../components/MovieList'
import { RiFolderCloseLine } from "react-icons/ri";

const Movies = () => {
  const month=[1,2,3,4,5,6,7,8,9,10,11,12];
  const [addMovie, setAddMovie]=useState(false);
  const [releaseDate, setReleaseDate] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (event) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    setReleaseDate(date);
  };

  return (
    <>
    <div className='h-full w-full overflow-y-scroll '>
      <div className='m-2 h-[10%] flex justify-end'>
        <button className='h-[80%] w-[25%] border-2 border-white bg-black text-yellow-400 font-bold text-lg rounded-md hover:bg-white hover:text-yellow-400 hover:border-yellow-400 transition duration-300' onClick={()=>setAddMovie(!addMovie)}>Add a Movie</button>
      </div>
      {
        month.map((data, index)=>(
          <div key={index} className='flex flex-col'>
            <h1>month: {data}</h1>
            <MovieList month={data-1} />
          </div>
        ))
      }
    </div>
    {
      addMovie && (
        <div className='h-screen w-screen absolute top-0 left-0 bg-black/20 flex justify-center items-center z-50'>
          <div className='h-[70%] w-[30%] border-2 border-black bg-white flex flex-col justify-between items-center'>
            <div className='h-[100%] w-[100%] flex flex-col justify-around items-center'>
            <div className='w-[80%] flex justify-between '>
              <div></div>
              <h1 className='h-[20%] font-bold text-2xl'>Add a Movie</h1>
              <RiFolderCloseLine onClick={()=>setAddMovie(!addMovie)} className='h-7' />
            </div>
            <form className=' h-[60%] flex flex-col justify-around items-center '>
            <input className='h-[15%] p-2 bg-yellow-100 border-b-2 border-yellow-500' type='text'  placeholder="Image Url" required></input>
                <input className='h-[15%] p-2 bg-yellow-100 border-b-2 border-yellow-500' type='text'  placeholder="Name" required></input>
                <input
        className='h-[15%] p-2 bg-yellow-100 border-b-2 border-yellow-500'
        type={isFocused || releaseDate ? 'date' : 'text'}
        id="releaseDate"
        name="releaseDate"
        value={releaseDate instanceof Date ? releaseDate.toISOString().split('T')[0] : ''}
        onChange={handleDateChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Release Date"
        required
      />
                <input className='h-[15%] p-2 bg-yellow-100 border-b-2 border-yellow-500 ' type='password' placeholder="Description"
                required
                ></input>
                <button className='h-[10%] border-2 border-yellow-400 text-yellow-400 px-5 bg-white rounded-md hover:bg-black transition duration-300 hover:border-none'>Add</button>
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