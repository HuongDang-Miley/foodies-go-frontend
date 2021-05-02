import React, { useState } from 'react'
import { connect } from 'react-redux'
import './favPlaceSummary.css'
import AddNoteModal from '../modal/AddNoteModal'
import DeleteModal from '../modal/DeleteModal'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { mouseEnter } from '../../stores/actions/mapActionCreator'


function FavPlaceSummary(props) {
    
    let [openAddNoteModal, setOpenAddNoteModal] = useState(false)
    let [openDeleteModal, setOpenDeleteModal] = useState(false)

    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(false)
        props.setShowFavPlaceDetail(true)
        props.getPlaceDetail(id)
        props.mouseEnter(null)
    }

    return (
        <div className='fav-place-detail-wrapper'>
            {props.disableDeleteModal
                ? <button className='delete-btn' onClick={() => props.deletePlace(props.favList, props.userId, props.place.place_id)}>Delete From Favorites outside ternary</button>
                : <button className='delete-btn' onClick={() => setOpenDeleteModal(true)}>Delete From Favorites</button>
            }
            <div
                onClick={() => handleShowPlaceDetail(props.place.place_id)}
                onMouseEnter={() => props.mouseEnter(props.place)}
            >
                <p>{props.place.name}</p>
                <p>{props.place.rating}</p>
                <p>{props.place.price_level}</p>
                <p>{props.place.website}</p>
                <p>{props.place.vicinity}</p>
                <p>{props.place.formatted_phone_number}</p>
                <p>{props.place.note}</p>
            </div>
            <button onClick={() => setOpenAddNoteModal(true)}>{props.place.note === null ? "Add Note" : "Edit Note"}</button>
            {props.place.note === null
                ? null
                : <button onClick={() => props.deleteNote(props.favList, props.userId, props.place.place_id)}>Delete Note</button>}

            {openAddNoteModal ?
                <AddNoteModal
                    setOpenAddNoteModal={setOpenAddNoteModal}
                    addNote={props.addNote}
                    userId={props.userId}
                    place={props.place}
                    favList={props.favList}
                /> : null}

            {openDeleteModal ?
                <DeleteModal
                    disableDeleteModal={props.disableDeleteModal}
                    setDisableDeleteModal={props.setDisableDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    deletePlace={props.deletePlace}
                    userId={props.userId}
                    placeId={props.place.place_id}
                    favList={props.favList}
                /> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(FavPlaceSummary)