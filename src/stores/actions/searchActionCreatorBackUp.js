import Axios from './Axios.js'
import axios from 'axios'
const key = process.env.GOOGLE_API_KEY


export const getNearbySearch = (keyword, location) => async dispatch => {
    
    let response = await Axios.get(`/search/near-by-search`, { params: { keyword: keyword, location: location } })
    
    
    return dispatch({
        type: "SHOW_NEARBY_SEARCH",
        results: response.data.results,  
     
    })
}


export const getPlaceDetail = (id) => async dispatch => {
    
    let response = await Axios.get(`/search/place-detail/${id}`) 
   
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

