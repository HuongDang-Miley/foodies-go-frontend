
const initialState = {
    travelMode: 'WALKING',
    distance: '',
    duration: '',
    venues: [],
    hoveredPlace: null,
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DISTANCE":
            return {
                ...state,
                distance: action.distance
            }

        case "GET_DURATION":
            return {
                ...state,
                duration: action.duration
            }

        case "MOUSE_ENTER":
            return {
                ...state,
                hoveredPlace: action.place
            }


        case 'TRAVEL_MODE':
            console.log(action)
            return {
                ...state,
                travelMode: action.travelMode
            }

        default: return state
    }
}



export default mapReducer


