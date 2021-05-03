const initialState = {
    isAuth: false,
    successRegisterMessage: "",
    errorRegisterMessage: "",
    loginErrorMessage: "",
    user: {},
    userLocation: null,
    userLatLng: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'HANDLE_ERROR_MESSAGE':
            return {
                state,
                loginErrorMessage: action.loginErrorMessage,
                successMessage: action.successMessage,
            }

        case "GET_USER_LOCATION":
            return {
                ...state,
                userLocation: action.userLocation,
                userLatLng: action.userLatLng
            }

        case 'LOGIN':
            console.log(action)
            return {
                ...state,
                user: action.user
            }

        case 'REGISTER':
            console.log(action)
            return {
                ...state,
                successRegisterMessage: action.successRegisterMessage,
                errorRegisterMessage: action.errorRegisterMessage,
            }


        default: return state
    }
}

export default authReducer