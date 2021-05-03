import React, { useState, useEffect } from 'react'
import './placeDetail.css'
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import SearchBar from '../searchBar/SearchBar'
import { connect } from 'react-redux'
import { togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { AddToFavorites, deletePlace } from '../../stores/actions/favActionCreator'
import { converRatingToStar, convertPriceLevel, upperCaseFirstChar } from '../../stores/actions/displayActionsCreator'


// MUI elements
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { Button, IconButton, Link, makeStyles, Typography } from '@material-ui/core'
import useStyles from '../../stores/Theme.js'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DirectionsIcon from '@material-ui/icons/Directions';

function PlaceDetail(props) {

    console.log('props in PlaceDetail', props)
    // ============================================================================================================
    //Declare Variable
    //============================================================================================================

    const classes = useStyles()
    let history = useHistory()
    let [userId, setUserId] = useState('')
    const [showAddToFavBtn, setShowAddToFavBtn] = useState(true)
    const [showOpenHour, setShowOpenHour] = useState(false)
    const [placeDetail, setPlaceDetail] = useState(null)


    // ============================================================================================================
    // Check for userId. If there is userId, user can add placeDetail to Favorites, if not, page redirect to Login page 
    // ============================================================================================================

    useEffect(async () => {
        let userToken = await localStorage.getItem('userToken')
        if (userToken) {
            let decoded = jwtDecode(userToken)
            setUserId(decoded.id)
        }

        if (props.placeDetail) {
            await setPlaceDetail(props.placeDetail)
        }

    }, [])

    // ============================================================================================================
    // Functions
    // ============================================================================================================

    const handleAddToFavorites = () => {
        userId === ''
            ? history.push('/login')
            : props.AddToFavorites(userId, props.placeDetail)
        setShowAddToFavBtn(false)
    }

    const handleDetelePlace = () => {
        props.deletePlace(props.favList, userId, props.placeDetail.place_id)
        setShowAddToFavBtn(true)
    }

    const handleGetDirection = () => {
        localStorage.setItem('destinationLat', props.placeDetail.geometry.location.lat)
        localStorage.setItem('destinationLng', props.placeDetail.geometry.location.lng)
        // localStorage.setItem('userLat', props.userLocation.latitude)
        // localStorage.setItem('userLng', props.userLocation.longitude)
        history.push('/directions')
    }



    return (

        <div>
            <div className='search-bar'>
                <SearchBar />
            </div>

            <div className='actions-bar'>
                {props.showFavPlaceDetail ? <Link
                    style={{ cursor: 'pointer' }}
                    variant='body2'
                    color='secondary'
                    onClick={() => props.setShowFavPlaceDetail(false)}
                >{`   ← Back To Favorites`}</Link> : null}

                {props.showPlaceDetail ? <Link
                    style={{ cursor: 'pointer' }}
                    variant='body2'
                    color='secondary'
                    onClick={() => { props.togglePlaceDetail(false) }}
                >← Back To Search Result</Link> : null}


                {/* {props.showFavPlaceDetail ? <button onClick={() => { props.setShowFavPlaceDetail(false) }}>Back To Favorites</button> : null} */}
                {/* {props.showPlaceDetail ? <button onClick={() => { props.togglePlaceDetail(false) }}>Back To Search Result</button> : null} */}
            </div>
            {props.placeDetail !== null

                ? <div className={props.showPlaceDetail ? 'placeDetail-wrapper' : null} >
                    <Card className={classes.card}>

                        <CardHeader
                            title={props.placeDetail.name}
                            subheader={upperCaseFirstChar(`${props.placeDetail.types[0]}, ${props.placeDetail.types[1]}, ${props.placeDetail.types[2]}`)}
                        />
                        <CardActions>
                            <Button
                                onClick={() => handleGetDirection()}
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DirectionsIcon />}
                            >
                                Get Directions
      </Button>


                            {showAddToFavBtn
                                ? <Button
                                    onClick={() => handleAddToFavorites()}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<FavoriteIcon />}
                                >
                                    Add To Favorites
  </Button>
                                : <Button
                                    onClick={() => handleDetelePlace()}
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete From Favorite
  </Button>
                            }

                        </CardActions>
                        <CardContent>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {`${props.placeDetail.rating} `}
                                <img src={converRatingToStar(props.placeDetail.rating)} alt={props.placeDetail.rating} height={16} />
                                {/* {` (${props.placeDetail.reviews.length}) ${convertPriceLevel(props.placeDetail.price_level)}`} */}
                                {props.placeDetail.reviews ? props.placeDetail.reviews.length : null} ${convertPriceLevel(props.placeDetail.price_level)}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {props.placeDetail.name}
                            </Typography>
                            <Link
                                href={props.placeDetail.website}
                                target="_blank"
                                color='secondary'
                                variant='body2'> {props.placeDetail.website}</Link>

                            <Typography variant="body1" color="textSecondary" component="p">
                                {props.placeDetail.vicinity}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {props.placeDetail.formatted_phone_number}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {props.placeDetail.opening_hours.open_now ? 'Open Now' : 'Close'}
                                <span onClick={() => setShowOpenHour(!showOpenHour)}> Open Hours:  ▼ </span>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {showOpenHour ?
                                    <div>{props.placeDetail.opening_hours.weekday_text.map(item => <p>{item}</p>)}</div>
                                    : null}
                            </Typography>
                            <Typography variant="h8" color="textSecondary" component="p">
                                <h3>Reviews</h3>
                            </Typography>
                        </CardContent>

                        {/* ============================================================================================================
                     User Reviews section
                      ============================================================================================================ */}
                        {props.placeDetail.reviews
                            ? <>
                                {props.placeDetail.reviews.map(item =>

                                    <Card key={item.author_name}>
                                        <CardHeader
                                            title={item.author_name}
                                            avatar={<img className='user-review-img' src={item.profile_photo_url} height='48' />}
                                            subheader={`${item.rating} reviews`}
                                        />

                                        <CardContent>
                                            <Typography variant="body1" color="textSecondary" component="p">
                                                {item.relative_time_description}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.text}
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                )}</>
                            : null}

                    </Card>

                    {/* ============================================================================================================
             IF there is a placeDetail, show it
             ============================================================================================================ */}

                    {props.placeDetail === null ? null :
                        <div>
                            {/* ============================================================================================================
                    Back and Add To Favorites Section
                    ============================================================================================================ */}
                            {/* <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button> */}
                            {/* {showAddToFavBtn
                                ? <button className='add-to-fav-btn' onClick={() => handleAddToFavorites()}>Add To Favorite</button>
                                : <button className='add-to-fav-btn' onClick={() => handleDetelePlace()}>Delete From Favorite</button>
                            }
                            <button onClick={() => handleGetDirection()}>Get Directions</button> */}
                            {/* <button onClick={() => history.push('/directions')}>Get Directions</button> */}
                            {/* ============================================================================================================
                    Place Detail section
                    ============================================================================================================ */}


                            {/* <h2>{props.placeDetail.name}</h2> */}
                            {/* <p>{props.placeDetail.types[0]}</p> */}
                            {/* <p>Rating: {props.placeDetail.rating}</p> */}
                            {/* <p>{props.placeDetail.reviews.length} Reviews</p> */}
                            {/* <p>Price: {convertPriceLevel(props.placeDetail.price_level)} </p> */}
                            {/* <p>Website: {props.placeDetail.website}</p>
                    <p>Address:{props.placeDetail.vicinity}</p>
                    <p>Phone: {props.placeDetail.formatted_phone_number}</p> */}
                            {/* <p>{props.placeDetail.opening_hours.open_now ? 'Open Now' : 'Close'}
                        <span onClick={() => setShowOpenHour(!showOpenHour)}> Open Hours:  ▼ </span></p> */}
                            {/* {showOpenHour ?
                        <div>{props.placeDetail.opening_hours.weekday_text.map(item => <p>{item}</p>)}</div>
                        : null} */}
                            {/* <h3>Reviews</h3> */}

                            {/* ============================================================================================================
                     User Reviews section
                      ============================================================================================================ */}

                            {/* {props.placeDetail.reviews.map(item =>
                                <div className='review-wrapper' key={item.author_name}>
                                    <img className='user-review-img' src={item.profile_photo_url} />
                                    <span>{item.author_name}</span>
                                    <p>{item.rating}</p>
                                    <span>{item.relative_time_description}</span>
                                    <p>{item.text}</p>
                                </div>
                            )} */}
                        </div>
                    }



                </div>

                : null}

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList,
        placeDetail: state.searchReducer.placeDetail,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
        userLocation: state.authReducer.userLocation,
    }
}

export default connect(mapStateToProps, { AddToFavorites, deletePlace, togglePlaceDetail })(PlaceDetail)


//=================================================================================
// START ORGINIAL CODE
//=================================================================================

// import React, { useState, useEffect } from 'react'
// import './placeDetail.css'
// import { useHistory } from 'react-router-dom';
// import jwtDecode from 'jwt-decode'
// import SearchBar from '../searchBar/SearchBar'
// import { connect } from 'react-redux'
// import { togglePlaceDetail } from '../../stores/actions/searchActionCreator'
// import { AddToFavorites, deletePlace } from '../../stores/actions/favActionCreator'

// function PlaceDetail(props) {
//     // console.log(props)
//     // ============================================================================================================
//     //Declare Variable
//     //============================================================================================================

//     let history = useHistory()
//     let [userId, setUserId] = useState('')
//     const [showAddToFavBtn, setShowAddToFavBtn] = useState(true)


//     // ============================================================================================================
//     // Check for userId. If there is userId, user can add placeDetail to Favorites, if not, page redirect to Login page 
//     // ============================================================================================================

//     useEffect(() => {
//         let userToken = localStorage.getItem('userToken')
//         if (userToken) {
//             let decoded = jwtDecode(userToken)
//             setUserId(decoded.id)
//         }
//     }, [])

//     // ============================================================================================================
//     // Functions
//     // ============================================================================================================

//     const priceLevel = (num) => {
//         if (num === undefined) { return '$' }
//         if (Number(num) === 1) { return '$' }
//         if (Number(num) === 2) { return '$$' }
//         if (Number(num) === 3) { return '$$$' }
//         if (Number(num) === 4) { return '$$$$' }
//     }

//     const handleAddToFavorites = () => {
//         userId === ''
//             ? history.push('/login')
//             : props.AddToFavorites(userId, props.placeDetail)
//         setShowAddToFavBtn(false)
//     }

//     const handleDetelePlace = () => {
//         props.deletePlace(props.favList, userId, props.placeDetail.place_id)
//         setShowAddToFavBtn(true)
//     }

//     const handleGetDirection = () => {
//         localStorage.setItem('destinationLat', props.placeDetail.geometry.location.lat)
//         localStorage.setItem('destinationLng', props.placeDetail.geometry.location.lng)
//         // localStorage.setItem('userLat', props.userLocation.latitude)
//         // localStorage.setItem('userLng', props.userLocation.longitude)
//         history.push('/directions')
//     }

//     const [showOpenHour, setShowOpenHour] = useState(false)

//     return (
//         <div>
//             <div className='search-bar'>
//                 <SearchBar />
//             </div>
//             <div className='actions-bar'>
//                 {props.showFavPlaceDetail ? <button onClick={() => { props.setShowFavPlaceDetail(false) }}>Back To Favorites</button> : null}
//                 {/* {props.showPlaceDetail ? <button onClick={() => { props.setShowPlaceDetail(false) }}>Back To Search Result</button> : null} */}
//                 {props.showPlaceDetail ? <button onClick={() => { props.togglePlaceDetail(false) }}>Back To Search Result</button> : null}
//                 {/* <button onClick={() => props.togglePlaceDetail(false)}>Back To Search Result</button> */}
//             </div>
//             <div className='placeDetail-wrapper'>

//                 {/* ============================================================================================================
//             IF there is a placeDetail, show it
//             ============================================================================================================ */}

//                 {props.placeDetail === null ? null :
//                     <div>
//                         {/* ============================================================================================================
//                         Back and Add To Favorites Section
//                         ============================================================================================================ */}
//                         {/* <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button> */}
//                         {showAddToFavBtn
//                             ? <button className='add-to-fav-btn' onClick={() => handleAddToFavorites()}>Add To Favorite</button>
//                             : <button className='add-to-fav-btn' onClick={() => handleDetelePlace()}>Delete From Favorite</button>
//                         }
//                         <button onClick={() => handleGetDirection()}>Get Directions</button>
//                         {/* <button onClick={() => history.push('/directions')}>Get Directions</button> */}
//                         {/* ============================================================================================================
//                         Place Detail section
//                         ============================================================================================================ */}


//                         <h2>{props.placeDetail.name}</h2>
//                         <p>{props.placeDetail.types[0]}</p>
//                         <p>Rating: {props.placeDetail.rating}</p>
//                         <p>{props.placeDetail.reviews.length} Reviews</p>
//                         <p>Price: {priceLevel(props.placeDetail.price_level)} </p>
//                         <p>Website: {props.placeDetail.website}</p>
//                         <p>Address:{props.placeDetail.vicinity}</p>
//                         <p>Phone: {props.placeDetail.formatted_phone_number}</p>
//                         <p>{props.placeDetail.opening_hours.open_now ? 'Open Now' : 'Close'}
//                             <span onClick={() => setShowOpenHour(!showOpenHour)}> Open Hours:  ▼ </span></p>
//                         {showOpenHour ?
//                             <div>{props.placeDetail.opening_hours.weekday_text.map(item => <p>{item}</p>)}</div>
//                             : null}
//                         <h3>Reviews</h3>

//                         {/* ============================================================================================================
//                          User Reviews section
//                           ============================================================================================================ */}

//                         {props.placeDetail.reviews.map(item =>
//                             <div className='review-wrapper' key={item.author_name}>
//                                 <img className='user-review-img' src={item.profile_photo_url} />
//                                 <span>{item.author_name}</span>
//                                 <p>{item.rating}</p>
//                                 <span>{item.relative_time_description}</span>
//                                 <p>{item.text}</p>
//                             </div>
//                         )}
//                     </div>
//                 }


//             </div>
//         </div>
//     )
// }


// const mapStateToProps = (state) => {
//     return {
//         favList: state.favReducer.favList,
//         placeDetail: state.searchReducer.placeDetail,
//         showPlaceDetail: state.searchReducer.showPlaceDetail,
//         userLocation: state.authReducer.userLocation,
//     }
// }

// export default connect(mapStateToProps, { AddToFavorites, deletePlace, togglePlaceDetail })(PlaceDetail)

