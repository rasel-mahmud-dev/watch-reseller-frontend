import axios from "axios"


// export const backend = import.meta.env.DEV ? "http://localhost:4000" : "https://watch-reseller-raselmr.vercel.app"

export const backend = import.meta.env.DEV ? "http://localhost:4000" : "https://watch-reseller-rosy.vercel.app"
// export const backend = import.meta.env.DEV ? "http://192.168.71.224:4000" : ""

const api =  axios.create({
    baseURL: backend,
    withCredentials: true
})

function axiosInstance(){
    let token = localStorage.getItem("token");
    api.defaults.headers["token"] = token || "";
    return api;
}

export default axiosInstance
