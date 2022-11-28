import axiosInstance from "app/axios";

export function fetchCategoriesAction(dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let { data, status } = await axiosInstance().get("/api/v1/category");
            if (status === 200) {
                dispatch({
                    type: "FETCH_CATEGORIES",
                    payload: data,
                });
                resolve(data);
            } else {
                dispatch({
                    type: "FETCH_CATEGORIES",
                    payload: [],
                });
                resolve([]);
            }
        } catch (ex) {
            dispatch({
                type: "FETCH_CATEGORIES",
                payload: [],
            });
            resolve([]);
        }
    });
}
