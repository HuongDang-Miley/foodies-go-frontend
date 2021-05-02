import React, { useRef, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";

const Login = (props) => {
    console.log('props in login', props)
    let emailRef = useRef()
    let passwordRef = useRef()

    
    //=================================================================================
    // Check if there is a token. If yes, page redirect to home
    //=================================================================================
    let history = useHistory();
    let [isAuth, setIsAuth] = useState(false)


    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    //=================================================================================
    // When click login, if token is retrieved, redirect home and set errorMessage to null
    //=================================================================================

    const handleLogin = async (event) => {
        event.preventDefault()
        if (emailRef.current.value === '' || passwordRef.current.value === '') {
            alert("must fill in both email and password")
        }
        await props.login(emailRef.current.value, passwordRef.current.value)

        let userToken = await localStorage.getItem('userToken')

        if (userToken) {
            setIsAuth(true)
            history.push('/')
            props.handleErrorMessage(null)

        } else {
            setIsAuth(false)
        }

    }

    return (
        <>
            <Link to='/'>{`<- Go Home`}</Link>
            {isAuth ? <Redirect to='/' />
                : <div>
                    <div>This is LOGIN page</div>
                    <p>props.errorMessage: {props.errorMessage}</p>
                    < form onSubmit={handleLogin} >
                        <input ref={emailRef} placeholder='email' type='email'></input>
                        <input ref={passwordRef} placeholder='password' type='password'></input>
                        <button>LOGIN</button>
                        <Link to='/register'>Don't Have An Account? Register Here</Link>
                    </form >

                </div>}
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.authReducer.errorMessage
    }
}
export default connect(mapStateToProps, { login, handleErrorMessage })(Login);