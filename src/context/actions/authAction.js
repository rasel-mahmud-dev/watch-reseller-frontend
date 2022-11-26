import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    updateProfile,
    signOut,
} from "firebase/auth";

import axios from "../../axios";
import firebaseErrorCatch from "../../utils/firebaseErrorCatch";

// user login action
export function loginAction(auth, userData, dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            if (userCredential.user) {
                resolve(true);
            } else {
                reject("Please try again");
            }
        } catch (ex) {
            let s = firebaseErrorCatch(ex?.code);
            if (s) {
                reject(s);
            } else {
                reject(ex);
            }
        }
    });
}

// user registration process
export function registrationAction(auth, userData, dispatch) {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, avatarUrl, role, phone, email, password, address, location } = userData;

        try {
            // first remove token from cookie
            await removeTokenFromCookie();

            let displayName = firstName + (lastName ? " " + lastName : "");
            let currentUser = await generateAccessTokenAction({
                firstName,
                lastName,
                username: displayName,
                avatar: avatarUrl,
                role,
                phone,
                email,
                address,
                location,
                googleId: "",
                isEntry: true, // for true it not generate token. just put user data in users collection
            });

            if (!currentUser) {
                return reject("User registration fail, Please try again");
            }

            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (!userCredential || !userCredential.user) {
                return reject("User registration fail, Please try again");
            }

            // silence skip this
            updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: avatarUrl,
            })
                .then(() => {})
                .catch((ex) => {});

            resolve(currentUser);
        } catch (ex) {
            let s = firebaseErrorCatch(ex?.code);
            if (s) {
                reject(s);
            } else {
                reject(ex);
            }
        }
    });
}

export function googleSignInAction(auth) {
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new GoogleAuthProvider();
            let result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                resolve(user);
            }else{
                reject("Google login fail")
            }

        } catch (ex) {
            reject(ex);
        }
    });
}

export function validateToken() {
    return new Promise(async (resolve) => {
        try {
            let { status, data } = await axios.get("/api/v1/auth/validate-token");
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
            let { status, data } = await axios.post("/api/v1/auth/generate-token", payload);
            if (status === 201) {
                resolve(data);
            } else {
                resolve(null);
            }
        } catch (ex) {
            resolve(null);
        }
    });
}

export function getCurrentUserData() {
    return new Promise(async (resolve, _) => {
        try {
            let { status, data } = await axios.get("/api/v1/auth/get-current-user");
            if (status === 200) {
                resolve(data);
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
            let { status, data } = await axios.get("/api/v1/auth/logout");
            if (status === 200) {
                resolve();
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
            await removeTokenFromCookie();
            await signOut(auth).then(() => {
                dispatch({ type: "LOGOUT" });
            });
        } catch (ex) {}
    });
}


