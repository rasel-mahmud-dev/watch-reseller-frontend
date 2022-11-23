import axios from "axios"


export const backend = import.meta.env.DEV ? "http://localhost:4000" : ""

export default axios.create({
    baseURL: backend,
    withCredentials: true
})

