import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getUserLocation } from '../../stores/actions/authActionCreator'
import { togglePlaceDetail } from '../../stores/actions/searchActionCreator'

// MUI ELEMENTS
import { Paper, Button, TextField, createMuiTheme, ThemeProvider, Drawer, Typography, AppBar, Toolbar, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles({
    iconButton: {
        color: 'ffffff'
    },
    menuButton: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 100
    }
})

function MenuBar(props) {

    const classes = useStyles()

    //============================================================================================================
    //Check if there is a token
    //============================================================================================================
    let history = useHistory()
    let [isAuth, setIsAuth] = useState(false)
    let [userName, setUserName] = useState('')
    let [email, setEmail] = useState('')

    let getUserToken = async () => {
        let userToken = await localStorage.getItem('userToken')
        if (userToken) {
            let decodeToken = await jwtDecode(userToken)
            setEmail(decodeToken.email)
            setUserName(decodeToken.username)
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }

    useEffect(() => {
        props.getUserLocation()
        getUserToken()
    }, [setIsAuth])

    //============================================================================================================
    //Functions
    //============================================================================================================

    const logOut = async () => {
        await localStorage.removeItem('userToken')
        await setIsAuth(false)
        await localStorage.removeItem('destinationLat')
        await localStorage.removeItem('destinationLng')
        history.push('/')
    }


    const handleClickFavorites = () => {
        props.togglePlaceDetail(false)
        history.push('/favorites')
    }

    //============================================================================================================
    // Functions Handle Open Menu
    //============================================================================================================


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            {/* <div style={{ backgroundColor: 'white' }}> */}

                <Button color='primary' className={classes.menuButton}
                    onClick={() => handleClickFavorites()}
                ><FavoriteIcon />
                </Button>

                {isAuth
                    ? <Button variant ='contained' onClick={() => logOut()}>Logout</Button>
                    : <Button variant ='contained' onClick={() => history.push('/login')}>Login</Button>}
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userLocation: state.authReducer.userLocation,
        userLatLng: state.authReducer.userLatLng
    }
}
export default connect(mapStateToProps, { getUserLocation, togglePlaceDetail })(MenuBar)

//     //============================================================================================================
//     //START ORIGIN CODE
//     //============================================================================================================

// import React, { useState, useEffect } from 'react'
// import { connect } from "react-redux";
// import { useHistory } from 'react-router-dom';
// import { getUserLocation } from '../../stores/actions/authActionCreator'
// import { togglePlaceDetail } from '../../stores/actions/searchActionCreator'

// function Menu(props) {

//     //============================================================================================================
//     //Check if there is a token
//     //============================================================================================================
//     let history = useHistory()
//     let [isAuth, setIsAuth] = useState(false)

//     let getUserToken = async () => {
//         let userToken = await localStorage.getItem('userToken')
//         if (userToken) {
//             setIsAuth(true)
//         } else {
//             setIsAuth(false)
//         }
//     }

//     useEffect(() => {
//         props.getUserLocation()
//         getUserToken()
//     }, [])

//     //============================================================================================================
//     //Functions
//     //============================================================================================================

//     const logOut = async () => {
//         await localStorage.removeItem('userToken')
//         await setIsAuth(false)
//         await localStorage.removeItem('destinationLat')
//         await localStorage.removeItem('destinationLng')
//         history.push('/')
//     }


//     const handleClickFavorites = () => {
//         props.togglePlaceDetail(false)
//         history.push('/favorites')
//     }

//     return (
//         <div>
//             <button onClick={()=> handleClickFavorites()}>Favorites</button>
//             {isAuth
//                 ? <button onClick={() => logOut()}>Logout</button>
//                 : <button onClick={()=> history.push('/login')}>Login</button>}
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         userLocation: state.authReducer.userLocation,
//         userLatLng: state.authReducer.userLatLng
//     }
// }
// export default connect(mapStateToProps, { getUserLocation, togglePlaceDetail })(Menu)

