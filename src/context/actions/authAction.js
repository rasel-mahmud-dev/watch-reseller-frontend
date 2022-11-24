import {signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import axios from "../../axios";


export function googleSignInAction(auth) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user)

        })
        .catch((error) => {

        });
}


export function validateToken() {
    return new Promise(async (resolve) => {
        try {
            let {status, data} = await axios.get("/api/v1/auth/validate-token");
            if (status === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (ex) {
            resolve(false);
        }
    });
}

export function generateAccessTokenAction(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            let {status, data} = await axios.post("/api/v1/auth/generate-token", payload);
            if (status === 201) {
                resolve(data)
            } else {
                reject("Token Generate error");
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

export function getCurrentUserData() {
    return new Promise(async (resolve, _) => {
        try {
            let {status, data} = await axios.get("/api/v1/auth/get-current-user");
            if (status === 200) {
                resolve(data)
            } else {
                resolve(null);
            }
        } catch (ex) {
            resolve(null);
        }
    });
}


export function signOutAction(auth) {
    return new Promise(async (resolve, _) => {
        try {
            console.log(auth)
            // await signOut(auth);
            // localStorage.removeItem("token")
            resolve(true);
        } catch (ex) {
            resolve(false)
        }
    });

}



