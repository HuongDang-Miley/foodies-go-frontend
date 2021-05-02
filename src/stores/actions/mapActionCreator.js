
export const getDistance = (text) => dispatch => {
        console.log('text', text)
        return dispatch({ type: 'GET_DISTANCE', distance: text })
}
export const getDuration = (text) => dispatch => {
        console.log('text', text)
        return dispatch({ type: 'GET_DURATION', duration: text })
}
export const getTravelMode = (text) => dispatch => {
        console.log('text', text)
        return dispatch({ type: 'TRAVEL_MODE', travelMode: text })
}

export const mouseEnter = (place) => dispatch => {
        return dispatch({ type: 'MOUSE_ENTER', place: place })
}