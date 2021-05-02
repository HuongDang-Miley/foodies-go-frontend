import React from 'react'
import './filters.css'
import { connect } from "react-redux";
import { getfilterList } from '../../stores/actions/searchActionCreator'

function Filters(props) {

    console.log('props.places.length', props.places.length)

    return (
        <div className='filters-wrapper'>

            <div className='result-text'>{props.places.length} Results</div>

            <select id="rating"
                onChange={(event) => props.getfilterList(props.placesWithNoFilter, event.target.value, null, null)}
            >
                <option value='none' defaultValue hidden>Rating</option>
                <option value="">Any Rating</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>

            <select id="price"
                onChange={(event) => props.getfilterList(props.placesWithNoFilter, null, event.target.value, null)}
            >
                <option value='none' defaultValue hidden>Price</option>
                <option value=''>All Price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
            </select>

            <select id="open-hour"
                onChange={(event) => props.getfilterList(props.placesWithNoFilter, null, null, event.target.value)}
            >
                <option value='none' defaultValue hidden>Open Hour</option>
                <option value={true}>Open Now</option>
                <option value="">Any Time</option>
            </select>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        placesWithNoFilter: state.searchReducer.placesWithNoFilter,
        places: state.searchReducer.places,
    }
}

export default connect(mapStateToProps, { getfilterList })(Filters)
