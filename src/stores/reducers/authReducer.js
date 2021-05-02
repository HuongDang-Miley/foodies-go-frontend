const initialState = {
    isAuth: false,
    registerMessage: "",
    errorMessage: "",
    user: {},
    userLocation: null,
    userLatLng: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'HANDLE_ERROR_MESSAGE':
            return {
                state,
                errorMessage: action.errorMessage,
                successMessage: action.successMessage,
            }

        case "GET_USER_LOCATION":
            return {
                ...state,
                userLocation: action.userLocation,
                userLatLng: action.userLatLng
            }

        case 'REGISTER': 
            return {
                ...state,
                registerMessage: action.registerMessage
            }


        default: return state
    }
}

export default authReducer