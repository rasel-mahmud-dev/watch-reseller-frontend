import {useQuery} from "@tanstack/react-query";
import axiosInstance from "app/axios";


export function fetchOrdersAction() {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => {
            return axiosInstance()
                .get("/api/v1/order")
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


export function makeOrderAction(orderData) {
    return new Promise(async (resolve, reject) => {
        try {
            let { status, data } = await axiosInstance().post("/api/v1/order", orderData);
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


export function deleteOrderAction(orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            let { status, data } = await axiosInstance().delete("/api/v1/order/"+orderId);
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
