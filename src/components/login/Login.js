// =================================================================================
// Start MUI CODE
// =================================================================================

import React, { useRef, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";
import { Paper, Button, TextField, createMuiTheme, ThemeProvider, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: { main: red[700] }
    }
})

const useStyles = makeStyles({
    field: {
        marginTop: 16,
        marginBottom: 16,
        display: 'block'
    }
})


const Login = (props) => {

    const classes = useStyles()
    let history = useHistory();
    let [isAuth, setIsAuth] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    //=================================================================================
    // Check if there is a token. If yes, page redirect to home
    //=================================================================================

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }
        if (email && password) {
            await props.login(email, password)
        }

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
        <ThemeProvider theme={theme}>
            <>

                <Link to='/'>{`<- Go Home`}</Link>
                {isAuth ? <Redirect to='/' />
                    : <div>
                        <div>This is LOGIN page</div>
                        <p>{props.errorMessage}</p>

                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField className={classes.field}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                error={emailError}
                            />
                            <TextField className={classes.field}
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                error={passwordError}
                            />

                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >Login</Button>
                        </form>
                        <Link to='/register'>Don't Have An Account? Register Here</Link>

                    </div>}

            </>
        </ThemeProvider>
    )
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.authReducer.errorMessage
    }
}
export default connect(mapStateToProps, { login, handleErrorMessage })(Login);

// =================================================================================
// End MUI CODE
// =================================================================================

// //=================================================================================
// // Start Origin Code
// //=================================================================================

// import React, { useRef, useEffect, useState } from 'react'
// import { Link, Redirect, useHistory } from 'react-router-dom'
// import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
// import { connect } from "react-redux";


// const Login = (props) => {


//     console.log('props in login', props)
//     let emailRef = useRef()
//     let passwordRef = useRef()

//     //=================================================================================
//     // Check if there is a token. If yes, page redirect to home
//     //=================================================================================
//     let history = useHistory();
//     let [isAuth, setIsAuth] = useState(false)


//     useEffect(() => {
//         let userToken = localStorage.getItem('userToken')
//         if (userToken) {
//             setIsAuth(true)
//         } else {
//             setIsAuth(false)
//         }
//     }, [])

//     //=================================================================================
//     // When click login, if token is retrieved, redirect home and set errorMessage to null
//     //=================================================================================

//     const handleLogin = async (event) => {
//         event.preventDefault()
//         if (emailRef.current.value === '' || passwordRef.current.value === '') {
//             alert("must fill in both email and password")
//         }
//         await props.login(emailRef.current.value, passwordRef.current.value)

//         let userToken = await localStorage.getItem('userToken')

//         if (userToken) {
//             setIsAuth(true)
//             history.push('/')
//             props.handleErrorMessage(null)

//         } else {
//             setIsAuth(false)
//         }
//     }

//     return (
//         <>
//             <Link to='/'>{`<- Go Home`}</Link>
//             {isAuth ? <Redirect to='/' />
//                 : <div>
//                     <div>This is LOGIN page</div>
//                     <p>props.errorMessage: {props.errorMessage}</p>

//                     < form onSubmit={handleLogin} >
//                         <input ref={emailRef} placeholder='email' type='email'></input>
//                         <input ref={passwordRef} placeholder='password' type='password'></input>
//                         <button>Login</button>

//                     </form >
//                     <Link to='/register'>Don't Have An Account? Register Here</Link>

//                 </div>}

//         </>

//     )
// }


// const mapStateToProps = (state) => {
//     return {
//         errorMessage: state.authReducer.errorMessage
//     }
// }
// export default connect(mapStateToProps, { login, handleErrorMessage })(Login);

// //=================================================================================
// // End Origin Code
// //=================================================================================

