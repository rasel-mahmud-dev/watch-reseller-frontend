

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
export default reducer