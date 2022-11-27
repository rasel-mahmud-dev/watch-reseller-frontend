import axios from "axios"


// export const backend = import.meta.env.DEV ? "http://localhost:4000" : "https://watch-reseller-raselmr.vercel.app"

export const backend = import.meta.env.DEV ? "http://localhost:4000" : "https://watch-reseller-rosy.vercel.app"
// export const backend = import.meta.env.DEV ? "http://192.168.71.224:4000" : ""

export default axios.create({
    baseURL: backend,
    withCredentials: true
})

