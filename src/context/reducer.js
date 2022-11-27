

function reducer(state, action) {
    switch (action.type) {

        case "LOGIN":
            return {
                ...state,
                isAuthLoaded: true,
                auth: action.payload
            }

        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isOpenSidebar: !state.isOpenSidebar,
            }

            case "FETCH_WISHLIST":
            return {
                ...state,
                wishlist: action.payload,
            }
            case "ADD_WISHLIST":
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload],
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