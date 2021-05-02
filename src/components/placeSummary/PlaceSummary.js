import React from 'react'
import './placeSummary.css'
import { connect } from 'react-redux'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { mouseEnter } from '../../stores/actions/mapActionCreator'

function PlaceSummary(props) {
    console.log('props from PlaceSummary', props)

    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
        props.mouseEnter(null)
    }

    const businessStatus = (item) => {
        if (item.business_status === 'CLOSED_TEMPORARILY') { return 'Close Temporarily' }
        if (item.business_status === 'OPERATIONAL') {
            if (item.opening_hours.open_now) { return 'Open Now' }
            return 'Close'
        }
    }
    return (
        <div className='place-summary'>
            <div
                onClick={() => handleShowPlaceDetail(props.place.place_id)}
                onMouseEnter={() => props.mouseEnter(props.place)} 
            >
                <h2>{props.place.name}</h2>
                <p>Rating:{props.place.rating}</p>
                <p>Total Ratings:{props.place.user_ratings_total}</p>
                <p>Price:{props.place.price_level}</p>
                <p>{props.place.vicinity}, {props.place.plus_code.compound_code}</p>
                <p>{businessStatus(props.place)}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favPlaces: state.favReducer,
    }
}

export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(PlaceSummary)


