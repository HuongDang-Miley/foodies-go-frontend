import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { getUserLocation } from '../../stores/actions/authActionCreator'

function Menu(props) {
    let history = useHistory()

    //============================================================================================================
    //Check if there is a token
    //============================================================================================================
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


    return (
        <div>
            <button><Link to='/favorites'>Favorites</Link></button>
            {isAuth
                ? <button onClick={() => logOut()}>Logout</button>
                : <button><Link to='/login'>Login</Link></button>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userLocation: state.authReducer.userLocation,
        userLatLng: state.authReducer.userLatLng
    }
}
export default connect(mapStateToProps, { getUserLocation })(Menu)

