import axios from "app/axios";

export function deleteWatchAction(_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let {status, data} = await axios.delete("/api/v1/watch/"+_id);
            if (status === 201) {
                resolve(true)
            } else {
                resolve(null);
            }
        } catch (ex) {
            reject(ex);
        }
    });
}