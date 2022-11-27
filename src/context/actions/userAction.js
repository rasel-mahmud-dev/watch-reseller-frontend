import axios from "app/axios";
import { useQuery } from "@tanstack/react-query";


// get all buyers list for admin user.
export function fetchAllBuyers() {
    return useQuery({
        queryKey: ["all-buyers"],
        queryFn: () => {
            return axios
                .get(`/api/v1/auth/buyers`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        return data;
                    }
                })
                .catch((ex) => {
                    throw ex;
                });
        },
        retry: 2,
    });
}

// for admin user get all sellers list.
export function fetchAllSellers() {
    return useQuery({
        queryKey: ["sellers"],
        queryFn: () => {
            return axios
                .get(`/api/v1/auth/sellers`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        return data;
                    }
                })
                .catch((ex) => {
                    throw ex;
                });
        },
        retry: 2,
    });
}


// fetch individual seller buyer
export function fetchSellerBuyers() {
    return useQuery({
        queryKey: ["seller-buyers"],
        queryFn: () => {
            return axios
                .get(`/api/v1/auth/seller-buyers`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        return data;
                    }
                })
                .catch((ex) => {
                    throw ex;
                });
        },
        retry: 2,
    });
}


// for admin toggle seller verify.
export function makeSellerVerified(sellerId, verifyStatus) {
    return new Promise(async (resolve, reject) => {
        try {
            let { data, status } = await axios.patch("/api/v1/auth/seller-verify", { sellerId, verifyStatus });
            if (status === 201) {
                resolve(data);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}


// for admin seller delete action.
export function deleteSellerAction(sellerId) {
    return new Promise(async (resolve, reject) => {
        try {
            let { data, status } = await axios.delete(`/api/v1/auth/seller-delete/${sellerId}`);
            if (status === 201) {
                resolve(data);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

// for admin buyer delete action.
export function deleteBuyerAction(buyerId) {
    return new Promise(async (resolve, reject) => {
        try {
            let { data, status } = await axios.delete(`/api/v1/auth/buyer-delete/${buyerId}`);
            if (status === 201) {
                resolve(data);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}
