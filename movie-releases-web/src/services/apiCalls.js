import axios from "axios"

const api = "http://localhost:8000"

const loginDetails=(name, password)=>{
    return axios.post(`${api}/admin/login`,{name, password})
}

const addNewMovie=(imageUrl, movieName, releaseDate, description, actors, director)=>{
    return axios.post(`${api}/movie/add`,{imageUrl, movieName, releaseDate, description, actors, director})
}

const getMovieList=()=>{
    return axios.get(`${api}/movie/list`);
}

export {loginDetails, addNewMovie, getMovieList}