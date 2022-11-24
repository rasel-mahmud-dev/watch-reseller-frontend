import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";
import axios from "../../axios";
import firebaseErrorCatch from "../../utils/firebaseErrorCatch";


export function loginAction(auth, userData, dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)
            if(userCredential.user) {
                resolve(true);
            } else {
                reject("Please try again");
            }
        } catch (ex) {
            let s = firebaseErrorCatch(ex?.code)
            if (s) {
                reject(s);
            } else {
                reject(ex);
            }
        }
    });
}

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

export function removeTokenFromCookie() {
    return new Promise(async (resolve, reject) => {
        try {
            let {status, data} = await axios.get("/api/v1/auth/logout");
            if (status === 200) {
                resolve()
            } else {
                reject("Logout fail");
            }
        } catch (ex) {
            reject(ex);
        }
    });
}


export function signOutAction(auth, dispatch) {
    return new Promise(async (resolve, _) => {
        try {
            await removeTokenFromCookie()
            await signOut(auth).then(() => {
                dispatch({type: "LOGOUT"})
            })
        } catch (ex) {

        }
    });

}



