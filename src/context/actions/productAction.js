import axios, { backend } from "app/axios";
import { useQuery } from "@tanstack/react-query";

export function deleteWatchAction(_id) {
    return new Promise(async (resolve, _) => {
        try {
            let { status, data } = await axios.delete("/api/v1/product/" + _id);
            if (status === 201) {
                resolve(true);
            } else {
                resolve(null);
            }
        } catch (ex) {
            resolve(null);
        }
    });
}

export function fetchWatchForCategory(categoryId) {
    return useQuery({
        queryKey: ["watches", categoryId],
        queryFn: () =>
            axios
                .get(`/api/v1/product?categoryId=${categoryId}`)
                .then((res) => {
                    return res.data;
                })
                .catch((ex) => {
                    return null;
                }),
    });
}

export function fetchSellerProducts() {
    return useQuery({
        queryKey: ["sellerProducts"],
        queryFn: () => {
            return axios
                .get("/api/v1/product")
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

export function addProductAction(productDate) {
    return new Promise(async (resolve, reject) => {
        try {
            let { status, data } = await axios.post("/api/v1/product", productDate);
            if (status === 201) {
                resolve(data);
            } else {
                resolve(null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function makeOrderAction(orderData) {
    return new Promise(async (resolve, reject) => {
        try {
            let { status, data } = await axios.post("/api/v1/order", orderData);
            if (status === 201) {
                resolve(data);
            } else {
                resolve(null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function fetchAdvertiseProducts() {
    return useQuery({
        queryKey: ["advertises"],
        queryFn: () => {
            return axios
                .get("/api/v1/advertise")
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

export function addToAdvertiseProductAction(productId) {
    return new Promise(async (resolve, reject) => {
        try {
            let { status, data } = await axios.post(`/api/v1/advertise`, { productId });
            if (status === 201) {
                resolve(data);
            } else {
                resolve(null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

