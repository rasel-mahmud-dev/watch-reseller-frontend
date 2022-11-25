import axios from "app/axios";
import {useQuery} from "@tanstack/react-query";

export function deleteWatchAction(_id) {
    return new Promise(async (resolve, _) => {
        try {
            let {status, data} = await axios.delete("/api/v1/watch/"+_id);
            if (status === 201) {
                resolve(true)
            } else {
                resolve(null);
            }
        } catch (ex) {
            resolve(null);
        }
    });
}


export function fetchSellerProducts() {
    return useQuery({
        queryKey: ["sellerProducts"],
        queryFn: () => {
            return axios
                .get("/api/v1/watch")
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
            let {status, data} = await axios.post("/api/v1/watch", productDate);
            if (status === 201) {
                resolve(data)
            } else {
                resolve(null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function addToAdvertiseProductAction(productId) {
    return new Promise(async (resolve, reject) => {
        try {
            let {status, data} = await axios.get("/api/v1/watch/add-advertise/"+productId);
            if (status === 201) {
                resolve(data)
            } else {
                resolve(null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}