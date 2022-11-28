
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "app/axios";

export function fetchProductForCategory(categoryId) {
    return useQuery({
        queryKey: ["products", categoryId],
        queryFn: () =>
            axiosInstance()
                .get(`/api/v1/category/category-product/${categoryId}`)
                .then((res) => {
                    return res.data;
                })
                .catch((ex) => {
                    return null;
                }),
    });
}

export function fetchProductDetail(productId) {
    return new Promise(async (resolve, reject) => {
        try {
            let {status, data} = await axiosInstance().get(`/api/v1/product/${productId}`)
            if (status === 200) {
                resolve(data);
            } else {
                resolve(null);
            }
        } catch (ex){
            resolve(null);
        }
    })
}

export function fetchSellerProducts() {
    return useQuery({
        queryKey: ["sellerProducts"],
        queryFn: () => {
            return axiosInstance()
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

export function addProductAction(productData) {
    return new Promise(async (resolve, reject) => {
        try {
            let response;
            if(productData.productId) {
                response = await axiosInstance().patch("/api/v1/product", productData);
            } else {
                response = await axiosInstance().post("/api/v1/product", productData);
            }
            let {status, data } = response;
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
            return axiosInstance()
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
            let { status, data } = await axiosInstance().post(`/api/v1/advertise`, { productId });
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

export function deleteProductAction(_id) {
    return new Promise(async (resolve, _) => {
        try {
            let { status, data } = await axiosInstance().delete("/api/v1/product/" + _id);
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


/// search product
export function searchProductAction(text) {
    return axiosInstance().post("/api/v1/product/search", { title: text })
}
