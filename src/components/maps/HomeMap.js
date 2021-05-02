
import React, { useState, useCallback, useEffect } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { getNearbySearch, getPlaceDetail, togglePlaceDetail, mouseEnter } from '../../stores/actions/searchActionCreator'
import { getUserLocation } from '../../stores/actions/authActionCreator'



const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}


function HomeMap(props) {
    // console.log('props.userLocation location in HomeMap', props)

    /******************************************************************************************************************************
    *                   Declare vairable
    ******************************************************************************************************************************/

    const [selected, setSelected] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    const [showPlaceDetailInfoWindow, setShowPlaceDetailInfoWindow] = useState(true)
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


    // const onMapCLick = useCallback((event) => {
    //     const newLocation = `${event.latLng.lat()},${event.latLng.lng()}`
    //     let keyword = getKeyword()
    //     // setCenterLocation({lat: event.latLng.lat(), lng: event.latLng.lng()})
    //     // props.getNearbySearch(props.keyword, newLocation)
    //     console.log('newLocation', newLocation)
    //     console.log('keyword', keyword)
    //     // console.log('props.places', props.places)
    // }, [])

    const clickMap = (event) => {
        const newLocation = `${event.latLng.lat()},${event.latLng.lng()}`
        props.getNearbySearch(props.keyword, newLocation)
        // console.log('newLocation', newLocation)
        // console.log('props.keyword', props.keyword)
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
    *                     AutoComplete Function
    ******************************************************************************************************************************/
    const [autocomplete, setAutocomplete] = useState(null)
    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete)
        console.log('autocomplete: ', autocomplete)
    }

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            let place = autocomplete.getPlace()
            console.log('place lat', place.geometry.location.lat())
            console.log('place long', place.geometry.location.lng())
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

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
                            // icon='favicon.ico'
                            position={centerLocation}
                            onClick={() => {
                                setUserAddress(props.userLocation)
                                setSelected(null)
                                // setShowPlaceDetailInfoWindow(false)
                            }}
                        />
                        {/* {userAddress ?
                            <InfoWindow
                                position={centerLocation}
                                onCloseClick={() => { setUserAddress(null) }}
                            ><div>
                                    <p>My Location:</p>
                                    <p>{`${userAddress.city}  ${userAddress.state}, ${userAddress.postal} ${userAddress.country_code}`}</p>
                                </div></InfoWindow> : null} */}
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
                            // setShowPlaceDetailInfoWindow(false)
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
export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail, getUserLocation })(HomeMap)

