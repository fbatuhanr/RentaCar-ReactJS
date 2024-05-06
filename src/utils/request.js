import axios from "axios"

const newRequet = axios.create({
    baseURL: 'http://localhost:8080/Showroom/api/v1',
    // withCredentials: true

})

export default newRequet
