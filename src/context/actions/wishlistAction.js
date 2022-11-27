import axios from "app/axios";

export function fetchWishlistProductsAction() {
    return new Promise(async (resolve, reject) => {
        try {
            let { data, status } = await axios.get("/api/v1/wishlist")
            if (status === 200) {
                resolve(data);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function addToWishListProductAction(productId) {
    return new Promise(async (resolve, reject) => {
        try {
            let { data, status } = await axios.post("/api/v1/wishlist", { productId });
            if (status === 201) {
                resolve(data);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function deleteWishlistAction(wishId) {
    return new Promise(async (resolve, reject) => {
        try {
            let { status, data } = await axios.delete("/api/v1/wishlist/" + wishId);
            if (status === 201) {
                resolve(data);
            } else {
                reject("Wish delete fail");
            }
        } catch (ex) {
            reject(ex);
        }
    });
}
