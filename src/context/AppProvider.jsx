import {useReducer} from "react";
import AppContext from "./AppContext";

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

    return (
        <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
    )
}

export default AppProvider