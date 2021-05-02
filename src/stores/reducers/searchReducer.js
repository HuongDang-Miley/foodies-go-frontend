
const initialState = {
    placesWithNoFilter: [],
    places: [],
    placeDetail: null,
    showPlaceDetail: false,
    keyword: null,
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SEARCH_WORD':
            return {
                ...state,
                keyword: action.text
            }

        case "FILTER":
            return {
                ...state,
                places: action.filteredList
            }

        case 'TOGGLE_PLACE_DETAIL':
            console.log(action)
            return {
                ...state,
                showPlaceDetail: action.showPlaceDetail
            }

        case 'SHOW_PLACE_DETAIL':
            return {
                ...state,
                placeDetail: action.placeDetail
            }

        case 'SHOW_NEARBY_SEARCH':
            return {
                ...state,
                placesWithNoFilter: action.results,
                places: action.results
            }

        default: return state
    }
}



export default searchReducer


