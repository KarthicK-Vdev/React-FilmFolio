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

const getMovieYear =()=>{
    return axios.get(`${api}/movie/year`)
}

const getMovieAnalyticsData=()=>{
    return axios.get(`${api}/movie/analytics`)
}

const getMovieYearAnalyticsData=(year)=>{
    return axios.get(`${api}/movie/analytics/${year}`)
}

const getActorAnalyticDetails=(actorName)=>{
    return axios.get(`${api}/movie/analytics/actor/${actorName}`)
}

const getActorsList=()=>{
    return axios.get(`${api}/movie/actors`)
}

const deleteAMovie=(id)=>{
    return axios.delete(`${api}/movie/delete/${id}`)
}

const updateMovie=(id, editedMovie)=>{
    return axios.put(`${api}/movie/edit/${id}`,editedMovie)
}

export {loginDetails, addNewMovie, getMovieList, getMovieYear, getMovieAnalyticsData, getMovieYearAnalyticsData, getActorAnalyticDetails, getActorsList, deleteAMovie, updateMovie}