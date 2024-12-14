import React, { useEffect, useRef, useState } from 'react'
import { RiFolderCloseLine } from 'react-icons/ri';
import { updateMovie } from '../services/apiCalls';

const EditMovie = ({movie, removeEdit}) => {

  // const [editedMovie, setEditedMovie]=useState({
  //   _id:"",
  //   imageUrl:"",
  //   movieName:"",
  //   releaseDate:"",
  //   description:"",
  //   director:""
  // })

    const [releaseDate, setReleaseDate] = useState(movie.releaseDate.split("T")[0]);
    const [isFocused, setIsFocused] = useState(false);

    const imageUrl=useRef()
      const movieName=useRef()
      const description=useRef()
      const actors=useRef()
      const director=useRef()

      const handleDateChange = (event) => {
        const dateValue = event.target.value; // In YYYY-MM-DD format
        setReleaseDate(dateValue);
    };

    useEffect(()=>{
        imageUrl.current.value=movie.imageUrl
        movieName.current.value=movie.movieName
        description.current.value=movie.description
        director.current.value=movie.director
        actors.current.value=movie.actors.join(", ")

    },[movie])

    const handleEditMovie=async(e)=>{
      e.preventDefault()
      try {
        // const actorArray=actors.current.value.split(",").map((actor)=>actor.trim());
        const editedMovie = {
          imageUrl:imageUrl.current.value,
          movieName:movieName.current.value,
          releaseDate:releaseDate,
          description:description.current.value,
          actors:actors.current.value.split(",").map((actor)=>actor.trim()),
          director:director.current.value
        }
        const response= await updateMovie(movie._id, editedMovie)
        if(response.data)
        {
          removeEdit()
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    
  
      
    
  return (
    <div className='h-screen w-screen absolute top-0 left-0 bg-black/20 flex justify-center items-center z-50'>
                  <div className='h-[80%] w-[40%] border-2 border-black bg-white flex flex-col justify-between items-center'>
                    <div className='h-[100%] w-[100%] flex flex-col justify-around items-center'>
                    <div className='w-[80%] flex justify-between '>
                      <div></div>
                      <h1 className='h-[20%] font-bold text-2xl'>Edit the Movie</h1>
                      <RiFolderCloseLine
                      onClick={()=>removeEdit()}
                      className='h-7' />
                    </div>
                    <form onSubmit={handleEditMovie}  className=' h-[80%] w-[100%] flex flex-col justify-around items-center '>
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
        
                        <button type="submit" className='h-[10%] border-2 border-yellow-400 text-yellow-400 px-5 bg-white rounded-md hover:bg-black transition duration-300 hover:border-none'>Edit</button>
                    </form>
                    </div>
                  </div>
                  
                </div>
  )
}

export default EditMovie