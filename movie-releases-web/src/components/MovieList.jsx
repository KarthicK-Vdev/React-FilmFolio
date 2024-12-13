import React, { useEffect, useState } from 'react';
import { MovieData } from '../Data/MovieData';
import { deleteAMovie, getMovieList } from '../services/apiCalls';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';

const MovieList = ({month, year}) => {
  const admin = useSelector((state)=>state.auth.admin)
  const convertDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
  const deleteHanlder=async(id)=>{
    try {
      const response= await deleteAMovie(id)
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  const[movieList, setMovieList] = useState([])

  useEffect(()=>{
      const fetchMovies=async()=>{
        const {data}= await getMovieList();
        setMovieList(data)
      }
      fetchMovies()
  },[deleteHanlder])

  const monthMovies=movieList.filter((movie)=>{
    const date= new Date(movie.releaseDate)
    return date.getMonth()===month && date.getFullYear()===year
  })
  if(monthMovies.length==0)
  {
    return(
        <div className='h-full w-full flex justify-center items-center'>
            <h1 className='h-[200px] w-full'>No movies have been released</h1>
        </div>
    )
  }
  
  console.log("test")
  console.log(monthMovies)
  return (
    <div className="h-full w-full flex flex-col  items-center">
      <div className="h-[60%] w-[90%] flex flex-row overflow-x-auto space-x-4 py-4">
        {monthMovies.map((data, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[300px] border border-gray-300 rounded-lg shadow-lg flex flex-col items-center bg-white"
          >
            <div className='h-[40px] w-full flex justify-center items-center'>
              { admin && (
                <div className='h-[80%] w-[80%] flex justify-between items-center'>
                  <FaEdit className='text-lime-600 text-2xl'/>
                  <FaTrashAlt className='text-red-600 text-2xl cursor-pointer' onClick={()=>deleteHanlder(data._id)} />
                </div>
              )
              }
              </div>
            <div className="h-[220px] w-full overflow-hidden rounded-t-lg">
              <img src={data.imageUrl} alt={data.movieName} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h1 className="text-xl font-semibold text-center">{data.movieName}</h1>
              <h2 className="text-gray-500">Release Date: {convertDate(data.releaseDate)}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
