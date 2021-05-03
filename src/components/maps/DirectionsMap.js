import React, { useEffect, useState } from 'react'
import './maps.css'
import '../homePage/homePage.css'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { getDistance, getDuration } from '../../stores/actions/mapActionCreator'
import Menu from '../menu/Menu'

// MUI elements
import useStyles from '../../stores/Theme.js'
import { Button, Paper, Link, IconButton, makeStyles } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';



const DirectionsMap = (props) => {
    // console.log('userLocation in DirectionsMap', props.userLocation)
    const classes = useStyles()
    const history = useHistory()

    const travelOptions = [
        { name: 'DRIVING', selected: false },
        { name: 'WALKING', selected: false },
        { name: 'BICYCLING', selected: false },
        { name: 'TRANSIT', selected: false },
    ]

    const [startPoint, setStartPoint] = useState({ lat: null, lng: null })
    const [endPoint, setEndPoint] = useState({ lat: null, lng: null })
    const [travelMode, setTravelMode] = useState("DRIVING")
    const [loadDirection, setLoadDirection] = useState(false)


    let destinationLat = Number(localStorage.getItem('destinationLat'))
    let destinationLng = Number(localStorage.getItem('destinationLng'))
    let userLat = Number(localStorage.getItem('userLat'))
    let userLng = Number(localStorage.getItem('userLng'))


    useEffect(async () => {
        console.log('this line is useEffect')
        await setEndPoint({ lat: destinationLat, lng: destinationLng })
        // await setStartPoint({ lat: userLat, lng: userLng })
        await renderMap()
    }, [destinationLat, destinationLng, startPoint.lat, travelMode, endPoint.lat])




    // useEffect(() => {
    //     if (destinationLat && destinationLng) {
    //         setEndPoint({ lat: destinationLat, lng: destinationLng })
    //         renderMap()
    //     }
    //     console.log('endPoint', endPoint, 'destinationLng:', destinationLng)
    // }, [destinationLng, startPoint.lat])

    //============================================================================================================
    // Functions
    //============================================================================================================  

    // Switch travel option
    const handleTravelMode = (value) => {
        console.log('value before change selected', value)
        setTravelMode(value)
        // item.selected = true
        // console.log('item after change selected', item)
    }


    // Render Map content
    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw&callback=initMap")
        window.initMap = initMap
    }


    /******************************************************************************************************************************
    *                      Map content
    ******************************************************************************************************************************/

    const initMap = () => {
        // Create A Map
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: userLat, lng: userLng },
            zoom: 13
            // center: { lat: 40.7834345, lng: -73.9662495 },
        })

        //create a DirectionsService object to use the route method and get a result for our request
        const directionsService = new window.google.maps.DirectionsService();

        //create a DirectionsRenderer object which we will use to display the route
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        //bind the DirectionsRenderer to the map
        directionsRenderer.setMap(map);


        // Create Marker for Destination. If Direction is not load, show marker
        if (!loadDirection) {
            new window.google.maps.Marker({
                position: endPoint,
                map,
                title: "Hello World!",
            });
        }

        // Load direction if there is endpoint, startpoint, load
        if (startPoint !== null && endPoint !== null && loadDirection) {
            // console.log('request place run')
            directionsService.route(
                {
                    origin: startPoint,
                    destination: endPoint,
                    travelMode: travelMode,
                },
                (response, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(response);
                        console.log('response', response)
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
        // console.log('autocomplete: ', autocomplete)
    }

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            let place = autocomplete.getPlace()
            setStartPoint({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
            setLoadDirection(true)
        } else {
            setLoadDirection(false)
            console.log('Autocomplete is not loaded yet!')
        }
    }

    return (
        <div>
            {/* <div className='search-bar'>
                <Link to='./'>Back To Search</Link>
            </div> */}

            <div className='search-bar'>
                <Link
                    className={classes.navLink}
                    onClick={() => history.push('/')}
                >← Back To Search</Link>
            </div>

            <div className='directions-wrapper'>
                {/* {travelOptions.map((item) =>
                    <button
                        onClick={() => handleTravelMode(item)}
                        className={item.selected ? console.log('true', item.selected) : console.log('false', item.selected)}
                    // className={item.selected ? 'selected-mode normal' : 'normal'}
                    >{item.name}
                    </button>)} */}
                {/* <strong>{props.duration}</strong><span></span> */}

                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        className='autocomplete-input'
                        // className={classes.autoCompleteInput}
                        type="text"
                        placeholder="Customized your placeholder"
                    />
                </Autocomplete>

                <IconButton
                    className={classes.directionsBtn}
                    onClick={() => handleTravelMode('DRIVING')}
                >
                    <DirectionsCarIcon fontSize='large' />
                </IconButton>
                <IconButton
                    className={classes.directionsBtn}
                    onClick={() => handleTravelMode('WALKING')}
                >
                    <DirectionsWalkIcon fontSize='large' />
                </IconButton>
                <IconButton
                    className={classes.directionsBtn}
                    onClick={() => handleTravelMode('BICYCLING')}
                >
                    <DirectionsBikeIcon fontSize='large' />
                </IconButton>
                <IconButton
                    className={classes.directionsBtn}
                    onClick={() => handleTravelMode('TRANSIT')}
                >
                    <DirectionsTransitIcon fontSize='large' />
                </IconButton>

                <p><strong>{props.duration}</strong> {props.distance}</p>



            </div>
            <div id="map" className='map-wrapper' style={{ height: '100vh' }}></div>
            <div className='menu-wrapper'>
                <Menu />
            </div>
        </div >
    )

}

const mapStateToProps = (state) => {
    return {
        // placeDetail: state.searchReducer.placeDetail,
        userLocation: state.authReducer.userLocation,

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



/******************************************************************************************************************************
*                    Start Original Code
******************************************************************************************************************************/

// import React, { useEffect, useState } from 'react'
// import './maps.css'
// import '../homePage/homePage.css'
// import { connect } from 'react-redux'
// import { useHistory } from 'react-router-dom';
// import { Autocomplete } from '@react-google-maps/api';
// import { getDistance, getDuration } from '../../stores/actions/mapActionCreator'
// import Menu from '../menu/Menu'

// // MUI elements
// import useStyles from '../../stores/Theme.js'
// import { Button, Paper, Link, IconButton } from '@material-ui/core';
// import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
// import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
// import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
// import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
// // const useStyles = makeStyles({
// //     navLink: {
// //         marginLeft: 16,
// //         color: 'white'
// //     },


// // })

// const DirectionsMap = (props) => {
//     // console.log('userLocation in DirectionsMap', props.userLocation)
//     const classes = useStyles()
//     const history = useHistory()

//     const travelOptions = [
//         { name: 'DRIVING', selected: false },
//         { name: 'WALKING', selected: false },
//         { name: 'BICYCLING', selected: false },
//         { name: 'TRANSIT', selected: false },
//     ]

//     const [startPoint, setStartPoint] = useState({ lat: null, lng: null })
//     const [endPoint, setEndPoint] = useState({ lat: null, lng: null })
//     const [travelMode, setTravelMode] = useState("DRIVING")
//     const [loadDirection, setLoadDirection] = useState(false)


//     let destinationLat = Number(localStorage.getItem('destinationLat'))
//     let destinationLng = Number(localStorage.getItem('destinationLng'))
//     let userLat = Number(localStorage.getItem('userLat'))
//     let userLng = Number(localStorage.getItem('userLng'))


//     useEffect(async () => {
//         console.log('this line is useEffect')
//         await setEndPoint({ lat: destinationLat, lng: destinationLng })
//         // await setStartPoint({ lat: userLat, lng: userLng })
//         await renderMap()
//     }, [destinationLat, destinationLng, startPoint.lat, travelMode, endPoint.lat])




//     // useEffect(() => {
//     //     if (destinationLat && destinationLng) {
//     //         setEndPoint({ lat: destinationLat, lng: destinationLng })
//     //         renderMap()
//     //     }
//     //     console.log('endPoint', endPoint, 'destinationLng:', destinationLng)
//     // }, [destinationLng, startPoint.lat])

//     //============================================================================================================
//     // Functions
//     //============================================================================================================  

//     // Switch travel option
//     const handleTravelMode = (item) => {
//         setTravelMode(item.name)
//         console.log('item before change selected', item)
//         item.selected = true
//         console.log('item after change selected', item)
//     }


//     // Render Map content
//     const renderMap = () => {
//         loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw&callback=initMap")
//         window.initMap = initMap
//     }


//     /******************************************************************************************************************************
//     *                      Map content
//     ******************************************************************************************************************************/

//     const initMap = () => {
//         // Create A Map
//         var map = new window.google.maps.Map(document.getElementById('map'), {
//             center: { lat: userLat, lng: userLng },
//             zoom: 13
//             // center: { lat: 40.7834345, lng: -73.9662495 },
//         })

//         //create a DirectionsService object to use the route method and get a result for our request
//         const directionsService = new window.google.maps.DirectionsService();

//         //create a DirectionsRenderer object which we will use to display the route
//         const directionsRenderer = new window.google.maps.DirectionsRenderer();

//         //bind the DirectionsRenderer to the map
//         directionsRenderer.setMap(map);


//         // Create Marker for Destination. If Direction is not load, show marker
//         if (!loadDirection) {
//             new window.google.maps.Marker({
//                 position: endPoint,
//                 map,
//                 title: "Hello World!",
//             });
//         }

//         // Load direction if there is endpoint, startpoint, load
//         if (startPoint !== null && endPoint !== null && loadDirection) {
//             // console.log('request place run')
//             directionsService.route(
//                 {
//                     origin: startPoint,
//                     destination: endPoint,
//                     travelMode: travelMode,
//                 },
//                 (response, status) => {
//                     if (status === "OK") {
//                         directionsRenderer.setDirections(response);
//                         console.log('response', response)
//                         // get distance from response to state
//                         props.getDistance(response.routes[0].legs[0].distance.text)
//                         // set duration from response to state
//                         props.getDuration(response.routes[0].legs[0].duration.text)
//                     } else {
//                         // if startLocation notfound, throw alert
//                         window.alert("Directions request failed due to " + status);
//                         // reset routes to empty
//                         directionsRenderer.setDirections({ routes: [] });
//                         // reset map center to userLocation
//                         map.setCenter({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
//                     }
//                 }
//             )
//         }
//     }
//     /******************************************************************************************************************************
//     *                     Auto Complete Search Function
//     ******************************************************************************************************************************/
//     const [autocomplete, setAutocomplete] = useState(null)

//     const onLoad = (autocomplete) => {
//         setAutocomplete(autocomplete)
//         // console.log('autocomplete: ', autocomplete)
//     }

//     const onPlaceChanged = () => {
//         if (autocomplete !== null) {
//             let place = autocomplete.getPlace()
//             setStartPoint({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
//             setLoadDirection(true)
//         } else {
//             setLoadDirection(false)
//             console.log('Autocomplete is not loaded yet!')
//         }
//     }

//     return (
//         <div>
//             {/* <div className='search-bar'>
//                 <Link to='./'>Back To Search</Link>
//             </div> */}

//             <div className='search-bar'>
//                 <Link
//                     className={classes.navLink}
//                     onClick={() => history.push('/')}
//                 >← Back To Search</Link>
//             </div>

//             <div className='directions-wrapper'>
//                 {travelOptions.map((item) =>
//                     <button
//                         onClick={() => handleTravelMode(item)}
//                         className={item.selected ? console.log('true', item.selected) : console.log('false', item.selected)}
//                     // className={item.selected ? 'selected-mode normal' : 'normal'}
//                     >{item.name}
//                     </button>)}
//                 {/* <strong>{props.duration}</strong><span></span> */}
//                 <p><strong>{props.duration}</strong> {props.distance}</p>
//                 <IconButton>
//                     <DirectionsCarIcon fontSize='large' />
//                 </IconButton>
//                 <IconButton>
//                     <DirectionsWalkIcon fontSize='large' />
//                 </IconButton>
//                 <IconButton>
//                     <DirectionsBikeIcon fontSize='large' />
//                 </IconButton>
//                 <IconButton>
//                     <DirectionsTransitIcon fontSize='large' />
//                 </IconButton>

//                 <Autocomplete
//                     onLoad={onLoad}
//                     onPlaceChanged={onPlaceChanged}
//                 >
//                     <input
//                         className='autocomplete-input'
//                         type="text"
//                         placeholder="Customized your placeholder"
//                     />
//                 </Autocomplete>

//             </div>
//             <div id="map" className='map-wrapper' style={{ height: '100vh' }}></div>
//             <div className='menu-wrapper'>
//                 <Menu />
//             </div>
//         </div >
//     )

// }

// const mapStateToProps = (state) => {
//     return {
//         // placeDetail: state.searchReducer.placeDetail,
//         userLocation: state.authReducer.userLocation,

//         distance: state.mapReducer.distance,
//         duration: state.mapReducer.duration,
//     }
// }
// export default connect(mapStateToProps, { getDistance, getDuration })(DirectionsMap)

// function loadScript(url) {
//     var index = window.document.getElementsByTagName("script")[0]
//     var script = window.document.createElement("script")
//     script.src = url
//     script.async = true
//     script.defer = true
//     index.parentNode.insertBefore(script, index)
// }


