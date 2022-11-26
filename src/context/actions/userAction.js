import axios from "app/axios";
import { useQuery } from "@tanstack/react-query";


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
        queryKey: ["buyers"],
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

