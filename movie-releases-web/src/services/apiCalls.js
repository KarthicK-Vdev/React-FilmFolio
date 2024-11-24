import axios from "axios"

const api = "http://localhost:8000"

const loginDetails=(name, password)=>{
    return axios.post(`${api}/admin/login`,{name, password})
}

export {loginDetails}