import Axios from './Axios.js'

export const getNearbySearch = (keyword, location) => async dispatch => {
    console.log('keyword, location', keyword, location)
    let response = await Axios.get(`/search/near-by-search`, { params: { keyword: keyword, location: location } })

    console.log('response.data.result in getNearbySearch', response.data.result)

    return dispatch({
        type: "SHOW_NEARBY_SEARCH",
        results: response.data.results,
    })
}




export const getPlaceDetail = (id) => async dispatch => {
    // console.log('id in getPlaceDetail', id)

    let response = await Axios.get(`/search/place-detail/${id}`)

    console.log('iresponse.data.result in getPlaceDetail', response.data.result)
    return dispatch({
        type: 'SHOW_PLACE_DETAIL',
        placeDetail: response.data.result
    })
}

export const togglePlaceDetail = (boolean) => dispatch => {
    return dispatch({
        type: 'TOGGLE_PLACE_DETAIL',
        showPlaceDetail: boolean
    })
}


export const getfilterList = (places, rating = null, price = null, openHour = null) => dispatch => {
    let copyArr = [...places]

    if (rating) {
        copyArr = copyArr.filter(item =>
            Number(item.rating) > Number(rating)
            && Number(item.rating) < Number(rating) + 1)
    }

    if (price) {
        copyArr = copyArr.filter(item =>
            Number(item.price_level) === Number(price))
    }

    if (openHour) {
        copyArr = copyArr
            .filter(item => item.business_status === 'OPERATIONAL')
            .filter(item => item.opening_hours.open_now === true)
    }

    return dispatch({
        type: 'FILTER',
        filteredList: copyArr
    })
}

export const getSearchWord = (keyword) => dispatch => {
    return dispatch({ type: 'GET_SEARCH_WORD', text: keyword })
}

