import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getUserLocation } from '../../stores/actions/authActionCreator'
import { togglePlaceDetail } from '../../stores/actions/searchActionCreator'

function Menu(props) {
    
    //============================================================================================================
    //Check if there is a token
    //============================================================================================================
    let history = useHistory()
    let [isAuth, setIsAuth] = useState(false)

    let getUserToken = async () => {
        let userToken = await localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }

    useEffect(() => {
        props.getUserLocation()
        getUserToken()
    }, [])

    //============================================================================================================
    //Functions
    //============================================================================================================

    const logOut = async () => {
        await localStorage.removeItem('userToken')
        setIsAuth(false)
        history.push('/')
    }


    const handleClickFavorites = () => {
        props.togglePlaceDetail(false)
        history.push('/favorites')
    }

    return (
        <div>
            <button onClick={()=> handleClickFavorites()}>Favorites</button>
            {isAuth
                ? <button onClick={() => logOut()}>Logout</button>
                : <button onClick={()=> history.push('/login')}>Login</button>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userLocation: state.authReducer.userLocation,
        userLatLng: state.authReducer.userLatLng
    }
}
export default connect(mapStateToProps, { getUserLocation, togglePlaceDetail })(Menu)

