import React from 'react'
import './homePage.css'
import { connect } from "react-redux";
import HomeSidebar from '../homeSidebar/HomeSidebar'
import HomeMap from '../maps/HomeMap'
import PlaceDetail from '../placeDetail/PlaceDetail'
import Menu from '../menu/Menu'


function HomePage(props) {

    return (
        <div>
            <div className='map-wrapper'><HomeMap /></div>
            <div className='sidebar-wrapper'>
            {/* <div > */}
                {props.showPlaceDetail
                    ? <PlaceDetail />
                    : <HomeSidebar />
                }
            </div>

            <div className='menu-wrapper'><Menu /></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps)(HomePage)
