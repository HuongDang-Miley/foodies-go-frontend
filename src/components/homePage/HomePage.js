import React, { useState } from 'react'
import './homePage.css'
import { connect } from "react-redux";
import HomeSidebar from '../homeSidebar/HomeSidebar'
import HomeMap from '../maps/HomeMap'
import PlaceDetail from '../placeDetail/PlaceDetail'
import Menu from '../menu/Menu'
import { togglePlaceDetail } from '../../stores/actions/searchActionCreator'

function HomePage(props) {
    let [showPlaceDetail, setShowPlaceDetail] = useState(false)
    return (
        <div>
            <div className='map-wrapper'>
                <HomeMap />
            </div>
            <div className='sidebar-wrapper'>
                {props.showPlaceDetail
                // {showPlaceDetail
                    ? <PlaceDetail
                        showPlaceDetail={showPlaceDetail}
                        setShowPlaceDetail={setShowPlaceDetail}
                    />
                    : <HomeSidebar
                        setShowPlaceDetail={setShowPlaceDetail}
                    />
                }

            </div>
            <div className='menu-wrapper'>
                <Menu />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps, { togglePlaceDetail })(HomePage)
