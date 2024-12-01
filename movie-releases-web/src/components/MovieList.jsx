import React, { useEffect, useState } from 'react';
import { MovieData } from '../Data/MovieData';
import { getMovieList } from '../services/apiCalls';

const MovieList = ({month, year}) => {
  const convertDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
  const[movieList, setMovieList] = useState([])

  useEffect(()=>{
      const fetchMovies=async()=>{
        const {data}= await getMovieList();
        setMovieList(data)
      }
      fetchMovies()
  },[])

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
  return (
    <div className="h-full w-full flex flex-col  items-center">
      <div className="h-[60%] w-[90%] flex flex-row overflow-x-auto space-x-4 py-4">
        {monthMovies.map((data, index) => (
          <div
            key={index}
            className="min-w-[250px] max-w-[250px] border border-gray-300 rounded-lg shadow-lg flex flex-col items-center bg-white"
          >
            <div className="h-[200px] w-full overflow-hidden rounded-t-lg">
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
