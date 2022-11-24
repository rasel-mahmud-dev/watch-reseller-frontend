import {useEffect, useReducer} from "react";
import AppContext from "./AppContext";
import { getAuth} from "firebase/auth";
import {
    generateAccessTokenAction,
    getCurrentUserData,
    googleSignInAction,
    signOutAction,
    validateToken
} from "./actions/authAction";
import {onAuthStateChanged} from "firebase/auth"

export let dispatch

const initialState = {
    auth: null,
    isAuthLoaded: false,
    name: "rase",
}

function reducer(state, action) {
    switch (action.type) {

        case "LOGIN":
            return {
                ...state,
                isAuthLoaded: true,
                auth: action.payload
            }

        case "LOGOUT":
            return {
                ...state,
                isAuthLoaded: true,
                auth: null
            }

        default:
            return state
    }
}



function AppProvider(props) {

    const [state, dispatchState] = useReducer(reducer, initialState)
    dispatch = dispatchState

    const auth = getAuth();

    const actions = {
        googleSignInAction: ()=> googleSignInAction(auth),
        signOutAction: (dispatch)=> signOutAction(auth, dispatch)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (user) {
                let userData = {
                    username: user.displayName,
                    email: user.email,
                    googleId: user.uid,
                    avatar: user.photoURL,
                };

                let currentUser = null
                let validToken = await validateToken()
                if(!validToken){
                    currentUser = await generateAccessTokenAction(userData)
                } else {
                    currentUser = await getCurrentUserData()
                }
                if(currentUser){
                    dispatch({type: "LOGIN", payload: currentUser });
                }
            } else {
                // User is signed out
                dispatch({type: "LOGOUT"});
            }
        });

        return () => unsubscribe();
    }, []);



    return (
        <AppContext.Provider value={{state, actions}}>{props.children}</AppContext.Provider>
    )
}

export default AppProvider