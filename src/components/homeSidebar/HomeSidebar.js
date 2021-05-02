
import React from 'react'
import './homeSidebar.css'
import { connect } from "react-redux";
import PlaceSummary from '../placeSummary/PlaceSummary'
import Filters from '../filters/Filters'
import SearchBar from '../searchBar/SearchBar'
import { getfilterList } from '../../stores/actions/searchActionCreator'
import { mouseEnter } from '../../stores/actions/mapActionCreator'

function HomeSidebar(props) {
    return (
        <>
            <div className='search-bar'><SearchBar /></div>
            <div className='filters-bar'>
                <div className='filters'><Filters /></div>
            </div>
            {props.places.length === 0
                ? null
                : <div className='placelist-wrapper' onMouseLeave={() => props.mouseEnter(null)}  >
                    {props.places.map(item =>
                        <PlaceSummary
                            setShowPlaceDetail={props.setShowPlaceDetail}
                            place={item} key={item.place_id} />)}
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
    }
}

export default connect(mapStateToProps, { getfilterList, mouseEnter })(HomeSidebar)
