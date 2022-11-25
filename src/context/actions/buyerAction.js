import axios from "app/axios";

export function fetchSellerBuyers() {
    return new Promise(async (resolve, reject) => {

        try {
            let {status, data} = await axios.get(`/api/v1/auth/buyers`);
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