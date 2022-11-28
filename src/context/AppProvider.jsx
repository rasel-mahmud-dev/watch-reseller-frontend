import { useEffect, useReducer } from "react";
import AppContext from "./AppContext";
import { getAuth } from "firebase/auth";
import {
    generateAccessTokenAction,
    getCurrentUserData,
    googleSignInAction,
    signOutAction,
    validateToken,
    loginAction,
    registrationAction, passwordResetEmailAction,
} from "./actions/authAction";

import { onAuthStateChanged } from "firebase/auth";
import reducer from "./reducer";


export let dispatch;

const initialState = {
    auth: null,
    isAuthLoaded: false,
    name: "",
    isOpenSidebar: false,
    wishlist: [],
    searchProducts: [],
    categories: null
};

function AppProvider(props) {
    const [state, dispatchState] = useReducer(reducer, initialState);
    dispatch = dispatchState;

    // const location = useLocation();

    const auth = getAuth();

    const actions = {
        googleSignInAction: () => googleSignInAction(auth),
        signOutAction: () => signOutAction(auth, dispatch),
        loginAction: (userData) => loginAction(auth, userData),
        passwordResetEmail: (email) => passwordResetEmailAction(auth, email),
        registrationAction: (userData) => registrationAction(auth, userData),
        toggleSidebar: ()=>{
            dispatch({
                type: "TOGGLE_SIDEBAR"
            })
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                let name = user?.displayName.split(" ") || []
                let userData = {
                    username: user.displayName,
                    firstName: name[0],
                    lastName: name[1],
                    email: user.email,
                    googleId: user.uid,
                    avatar: user?.photoURL,
                };

                let currentUser = null;
                let validToken = await validateToken();

                // if token not valid then generate new token
                if (!validToken) {
                    currentUser = await generateAccessTokenAction(userData);
                } else {
                    // if token valid then get current user data from server
                    currentUser = await getCurrentUserData();
                }

                if (currentUser) {
                    dispatch({ type: "LOGIN", payload: currentUser });
                } else {
                    // backend server error
                    dispatch({ type: "LOGOUT" });
                }

            } else {
                // User is signed out
                dispatch({ type: "LOGOUT" });
            }
        });

        return () => unsubscribe();
    }, []);

    return <AppContext.Provider value={{ state, actions }}>{props.children}</AppContext.Provider>;
}

export default AppProvider