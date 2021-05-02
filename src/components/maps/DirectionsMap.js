import React, { useEffect, useState } from 'react'
import './maps.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { getDistance, getDuration } from '../../stores/actions/mapActionCreator'
import Menu from '../menu/Menu'


const DirectionsMap = (props) => {
    console.log('props in DirectionsMap', props.travelMode)

    const [startPoint, setStartPoint] = useState({ lat: null, lng: null })
    const [endPoint, setEndPoint] = useState({ lat: null, lng: null })
    const [travelMode, setTravelMode] = useState("DRIVING")

    useEffect(() => {
        if (props.placeDetail) {
            setEndPoint(props.placeDetail.geometry.location)
            renderMap()
        }
    }, [props.placeDetail, startPoint.lat])


    //============================================================================================================
    // Render Map content
    //============================================================================================================  

    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw&callback=initMap")
        window.initMap = initMap
    }

    //============================================================================================================
    // Map content
    //============================================================================================================  

    const initMap = () => {
        // Create A Map
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7834345, lng: -73.9662495 },
            zoom: 13
        })

        //create a DirectionsService object to use the route method and get a result for our request
        const directionsService = new window.google.maps.DirectionsService();

        //create a DirectionsRenderer object which we will use to display the route
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        //bind the DirectionsRenderer to the map
        directionsRenderer.setMap(map);

        // If ther is placeDetail and userLocation, create a route

        if (startPoint !== null && endPoint !== null) {
            directionsService.route(
                {
                    origin: startPoint,
                    destination: endPoint,
                    travelMode: travelMode,
                },
                (response, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(response);
                        // get distance from response to state
                        props.getDistance(response.routes[0].legs[0].distance.text)
                        // set duration from response to state
                        props.getDuration(response.routes[0].legs[0].duration.text)
                    } else {
                        // if startLocation notfound, throw alert
                        window.alert("Directions request failed due to " + status);
                        // reset routes to empty
                        directionsRenderer.setDirections({ routes: [] });
                        // reset map center to userLocation
                        map.setCenter({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
                    }
                }
            )
        }
    }
    /******************************************************************************************************************************
    *                     Auto Complete Search Function
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
            setStartPoint({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    return (
        <div>
            <div className='search-bar'>
                <Link to='./'>Back To Search</Link>
            </div>
            <div className='directions-wrapper'>
                <p>{props.duration}</p>
                <p>{props.distance}</p>
                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        className='autocomplete-input'
                        type="text"
                        placeholder="Customized your placeholder"
                    />
                </Autocomplete>

            </div>
            <div id="map" className='map-wrapper' style={{ height: '100vh' }}></div>
            <div className='menu-wrapper'>
                <Menu />
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        placeDetail: state.searchReducer.placeDetail,
        userLocation: state.authReducer.userLocation,
        travelMode: state.mapReducer.travelMode,
        distance: state.mapReducer.distance,
        duration: state.mapReducer.duration,
    }
}
export default connect(mapStateToProps, { getDistance, getDuration })(DirectionsMap)

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}


