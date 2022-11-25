import axios from "app/axios";
import { useQuery } from "@tanstack/react-query";

export function fetchSellerBuyers() {
    return useQuery({
        queryKey: ["advertises"],
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