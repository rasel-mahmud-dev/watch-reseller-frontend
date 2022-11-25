import { useQuery } from "@tanstack/react-query";
import axios from "app/axios";

export function fetchCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => {
            return axios
                .get("/api/v1/category")
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

export function fetchWatchForCategory(categoryId) {
    return useQuery({
        queryKey: ["watches", categoryId],
        queryFn: () =>
            axios
                .get(`/api/v1/watch?categoryId=${categoryId}`)
                .then((res) => {
                    return res.data;
                })
                .catch((ex) => {
                    return null;
                }),
    });
}
