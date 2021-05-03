import React, { useState, useEffect } from 'react'
import './favorites.css'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import FavMap from '../maps/FavMap'
import PlaceDetail from '../placeDetail/PlaceDetail'
import Menu from '../menu/Menu'
import LoginModal from '../modal/LoginModal'
import FavPlaceSummary from '../favPlaceSummary/FavPlaceSummary'
import { getUserLocation } from '../../stores/actions/authActionCreator'
import { loadFavorites, addNote, deleteNote, deletePlace } from '../../stores/actions/favActionCreator'
import { Button, Paper, Link, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useStyles from '../../stores/Theme.js'


// const useStyles = makeStyles({
//     navLink: {
//         marginLeft: 16,
//         color: 'white'
//     }
// })

function Favorites(props) {

    const classes = useStyles()

    // console.log('props.showPlaceDetail in Favorites', props.showPlaceDetail)
    const history = useHistory()
    let [disableDeleteModal, setDisableDeleteModal] = useState(false)
    let [showFavPlaceDetail, setShowFavPlaceDetail] = useState(false)

    //============================================================================================================
    //Check for usertoken. If no token found, redirect to login page. If there is token, load favorites places 
    //============================================================================================================
    let [isAuth, setIsAuth] = useState(false)
    let [userId, setUserId] = useState('')
    let [username, setUsername] = useState('')


    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        props.getUserLocation()
        if (userToken) {
            setIsAuth(true)
            let userInfo = jwtDecode(userToken)
            props.loadFavorites(userInfo.id)
            setUserId(userInfo.id)
            setUsername(userInfo.username)
        } else {
            setIsAuth(false)
        }
    }, [])

    return (

        <div>
            <div className='search-bar'>
                <Link
                    style={{ cursor: 'pointer' }}
                    className={classes.navLink}
                    onClick={() => history.push('/')}
                >← Back To Search</Link>
                <Typography variant='h8' className={classes.navTitle}>
                    FAVORITES LIST
                </Typography>
            </div>


            <div className='map-wrapper'>
                <FavMap
                    showFavPlaceDetail={showFavPlaceDetail}
                    setShowFavPlaceDetail={setShowFavPlaceDetail}
                />
            </div>

            {/* //============================================================================================================
            // Side Bar: 
            // If user haven't login, show modal to login. 
            // Default show FavList, if showPlaceDetail = true, show PlaceDetail
            //============================================================================================================  */}
            <div className='sidebar-wrapper'>
                {isAuth ?
                    <>
                        {showFavPlaceDetail
                            ? <div className='placeDetail-wrapper'>
                                <PlaceDetail
                                    showFavPlaceDetail={showFavPlaceDetail}
                                    setShowFavPlaceDetail={setShowFavPlaceDetail}
                                />
                            </div>
                            : <div className='favList-wrapper'>
                                {/* <h3>Favorite List</h3> */}
                                {props.favList.length === 0
                                    ? <p className='empty-text'>Your favorites list is empty</p>
                                    : props.favList.map(place =>
                                        <FavPlaceSummary
                                            setShowFavPlaceDetail={setShowFavPlaceDetail}
                                            key={place.place_id}
                                            disableDeleteModal={disableDeleteModal}
                                            setDisableDeleteModal={setDisableDeleteModal}
                                            deletePlace={props.deletePlace}
                                            deleteNote={props.deleteNote}
                                            favList={props.favList}
                                            place={place}
                                            userId={userId}
                                            addNote={props.addNote} />)}
                            </div>
                        }
                    </>
                    : <div>You Must Login To see your favorites<LoginModal /></div>
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
        favList: state.favReducer.favList
    }
}

export default connect(mapStateToProps, { loadFavorites, addNote, deleteNote, deletePlace, getUserLocation })(Favorites)


//============================================================================================================
//Start Original Code
//============================================================================================================

// import React, { useState, useEffect } from 'react'
// import './favorites.css'
// import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
// import jwtDecode from 'jwt-decode'
// import FavMap from '../maps/FavMap'
// import PlaceDetail from '../placeDetail/PlaceDetail'
// import Menu from '../menu/Menu'
// import LoginModal from '../modal/LoginModal'
// import FavPlaceSummary from '../favPlaceSummary/FavPlaceSummary'
// import { getUserLocation } from '../../stores/actions/authActionCreator'
// import { loadFavorites, addNote, deleteNote, deletePlace } from '../../stores/actions/favActionCreator'

// function Favorites(props) {

//     // console.log('props.showPlaceDetail in Favorites', props.showPlaceDetail)
//     // const history = useHistory()
//     let [disableDeleteModal, setDisableDeleteModal] = useState(false)
//     let [showFavPlaceDetail, setShowFavPlaceDetail] = useState(false)

//     //============================================================================================================
//     //Check for usertoken. If no token found, redirect to login page. If there is token, load favorites places 
//     //============================================================================================================
//     let [isAuth, setIsAuth] = useState(false)
//     let [userId, setUserId] = useState('')
//     let [username, setUsername] = useState('')


//     useEffect(() => {
//         let userToken = localStorage.getItem('userToken')
//         props.getUserLocation()
//         if (userToken) {
//             setIsAuth(true)
//             let userInfo = jwtDecode(userToken)
//             props.loadFavorites(userInfo.id)
//             setUserId(userInfo.id)
//             setUsername(userInfo.username)
//         } else {
//             setIsAuth(false)
//         }
//     }, [])

//     return (

//         <div>
//             <div className='search-bar'>
//                 <Link to='./'>Back To Search</Link>
//             </div>

//             <div className='map-wrapper'>
//                 <FavMap
//                     showFavPlaceDetail={showFavPlaceDetail}
//                     setShowFavPlaceDetail={setShowFavPlaceDetail}
//                 />
//             </div>

//             {/* //============================================================================================================
//             // Side Bar: 
//             // If user haven't login, show modal to login. 
//             // Default show FavList, if showPlaceDetail = true, show PlaceDetail
//             //============================================================================================================  */}
//             <div className='sidebar-wrapper'>
//                 {isAuth ?
//                     <>
//                         {showFavPlaceDetail
//                             ? <div className='placeDetail-wrapper'>
//                                 <PlaceDetail
//                                     showFavPlaceDetail={showFavPlaceDetail}
//                                     setShowFavPlaceDetail={setShowFavPlaceDetail}
//                                 />
//                             </div>
//                             : <div>
//                                 <h3>Favorite List</h3>
//                                 {props.favList.length === 0
//                                     ? 'Your favorites list is empty'
//                                     : props.favList.map(place =>
//                                         <FavPlaceSummary
//                                             setShowFavPlaceDetail={setShowFavPlaceDetail}
//                                             key={place.place_id}
//                                             disableDeleteModal={disableDeleteModal}
//                                             setDisableDeleteModal={setDisableDeleteModal}
//                                             deletePlace={props.deletePlace}
//                                             deleteNote={props.deleteNote}
//                                             favList={props.favList}
//                                             place={place}
//                                             userId={userId}
//                                             addNote={props.addNote} />)}
//                             </div>
//                         }
//                     </>
//                     : <div>You Must Login To see your favorites<LoginModal /></div>
//                 }
//             </div>
//             <div className='menu-wrapper'>
//                 <Menu />
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         favList: state.favReducer.favList
//     }
// }

// export default connect(mapStateToProps, { loadFavorites, addNote, deleteNote, deletePlace, getUserLocation })(Favorites)
