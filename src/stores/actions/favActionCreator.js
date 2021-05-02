

import Axios from './Axios.js'

export const AddToFavorites = (userId, place) => async dispatch => {

    let addPlace = {
        formatted_phone_number: place.formatted_phone_number,
        geometry: place.geometry,
        name: place.name,
        place_id: place.place_id,
        rating: place.rating,
        url: place.url,
        vicinity: place.vicinity,
        website: place.website,
        note: null
    }

    await Axios.post('/favorites/addToFavorites', { userId: userId, place: addPlace })
    return dispatch({
        type: 'ADD_TO_FAVORITES',
        newPlace: place
    })
}

//===================================================================================================================
//===================================================================================================================


export const loadFavorites = (id) => async dispatch => {
    
    let response = await Axios.get('/favorites/loadFavorites', { params: { userId: id } })
    console.log('response in fvaction Creator', response.data)

    return dispatch({
        type: "LOAD_FAVORITES",
        favList: response.data
    })
}


//===================================================================================================================
//===================================================================================================================

export const addNote = (favList, userId, placeId, note) => async dispatch => {

    await Axios.post('/favorites/addNote', {
        userId: userId,
        placeId: placeId,
        note: note
    })

    let updateFavList = favList.map(item => {
        if (item.place_id === placeId) {
            item.note = note
        } return item
    })

    return dispatch({
        type: "ADD_NOTE",
        favList: updateFavList
    })
}

//===================================================================================================================
//===================================================================================================================

export const deleteNote = (favList, userId, placeId) => async dispatch => {

    await Axios.post('/favorites/addNote', {
        userId: userId,
        placeId: placeId,
        note: null
    })

    let updateFavList = favList.map(item => {
        if (item.place_id === placeId) {
            item.note = null
        } return item
    })

    return dispatch({
        type: "ADD_NOTE",
        favList: updateFavList
    })
}

//===================================================================================================================
//===================================================================================================================

export const deletePlace = (favList, userId, placeId) => async dispatch => {
    

    await Axios.delete('/favorites/deletePlace', {
        params: {
            userId: userId,
            placeId: placeId,
        }
    })

    let updateFavList = favList.filter(item => item.place_id !== placeId)
    console.log('updateFavList from deletePlae', updateFavList)

    return dispatch({
        type: "DELETE_PLACE",
        favList: updateFavList
    })
}
