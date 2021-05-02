
import React, { useState, useRef, useEffect } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { mouseEnter } from '../../stores/actions/mapActionCreator'
import { getUserLocation } from '../../stores/actions/authActionCreator'



const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

// const usePrevious = (value) => {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value;
//     });
//     return ref.current;
// }

function HomeMap(props) {

    /******************************************************************************************************************************
    *                   Declare vairable
    ******************************************************************************************************************************/

    const [selected, setSelected] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    
    const [centerLocation, setCenterLocation] = useState({
        lat: 40.7834345,
        lng: -73.9662495
    })

    /******************************************************************************************************************************
    *                    Functions
    ******************************************************************************************************************************/
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
        libraries,
    });

    useEffect(() => {
        if (props.userLocation) {
            setCenterLocation({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
        }
    }, [props.userLocation])


    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
        props.mouseEnter(null)
    }

    /******************************************************************************************************************************
    *       Track newLocation lat and lng, if these value change, show "Search This Area" button
    ******************************************************************************************************************************/

    // const [newLocation, setNewLocation] = useState(null)

    // const clickMap = (event) => {
    //     setNewLocation(`${event.latLng.lat()},${event.latLng.lng()}`)
    //     props.getNearbySearch(props.keyword, newLocation)

    //     console.log('newLocation', newLocation)
    //     console.log('prevLocation', prevLocation)
    //     console.log('props.keyword', props.keyword)
    // }

    const clickMap = (event) => {
        const newLocation = `${event.latLng.lat()},${event.latLng.lng()}`
        props.getNearbySearch(props.keyword, newLocation)
    }


    const handleShowInfoWindow = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
    }


    const changeMarkerIcon = (item) => {
        if (props.hoveredPlace && item.place_id === props.hoveredPlace.place_id) { return 'selected-marker.svg' }
        if (props.showPlaceDetail && props.placeDetail && item.place_id === props.placeDetail.place_id) { return 'selected-marker.svg' }
        return null
    }

    /******************************************************************************************************************************
    *                     Check Isloaded
    ******************************************************************************************************************************/

    if (loadError) return 'Error Loading Map'
    if (!isLoaded) return 'Loading Maps'

    /******************************************************************************************************************************
    *                     Return Map
    ******************************************************************************************************************************/
    return (
        <div className="HomeMap">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={centerLocation}
                onClick={clickMap}
            >

                /******************************************************************************************************************************
                *                     Show user marker and InfoWindow if clicked
                ******************************************************************************************************************************/
                {props.userLocation ?
                    <>
                        <Marker
                            icon='current-location-marker.png'
                            position={centerLocation}
                            onClick={() => {
                                setUserAddress(props.userLocation)
                                setSelected(null)
                            }}
                        />
                        {userAddress ?
                            <InfoWindow
                                position={centerLocation}
                                onCloseClick={() => { setUserAddress(null) }}
                            ><div>
                                    <p>My Location:</p>
                                    <p>{`${userAddress.city}  ${userAddress.state}, ${userAddress.postal} ${userAddress.country_code}`}</p>
                                </div></InfoWindow> : null}
                    </> : null
                }

/******************************************************************************************************************************
*                     Show PlaceDetail marker and InfoWindow if clicked
******************************************************************************************************************************/

                {props.places.map((item) =>
                    <Marker
                        key={item.place_id}
                        icon={changeMarkerIcon(item)}
                        position={{
                            lat: item.geometry.location.lat,
                            lng: item.geometry.location.lng
                        }}
                        onClick={() => {
                            setSelected(item)
                            setUserAddress(false)
                        }}
                    />
                )}

                {selected ?
                    <InfoWindow
                        onClick={() => handleShowPlaceDetail()}
                        onCloseClick={() => { setSelected(null) }}
                        position={selected.geometry.location}
                    >
                        <div onClick={() => handleShowInfoWindow(selected.place_id)}>
                            <h3>{selected.name}</h3>
                            <h3>{selected.rating}</h3>
                            <h3>{selected.vicinity}</h3>
                        </div>
                    </InfoWindow> : null}
            </GoogleMap>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
        placeDetail: state.searchReducer.placeDetail,
        hoveredPlace: state.mapReducer.hoveredPlace,
        userLocation: state.authReducer.userLocation,
        keyword: state.searchReducer.keyword,
    }
}
export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail, getUserLocation, mouseEnter })(HomeMap)

