import {useReducer} from "react";
import AppContext from "./AppContext";
import { getAuth} from "firebase/auth";
import {googleSignInAction, signOutAction} from "./actions/authAction";
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



    return (
        <AppContext.Provider value={{state, actions}}>{props.children}</AppContext.Provider>
    )
}

export default AppProvider