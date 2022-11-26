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

