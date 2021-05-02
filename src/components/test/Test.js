import React, { useRef, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";
import { Paper, Button, TextField, createMuiTheme, ThemeProvider } from '@material-ui/core'
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


const Test = (props) => {
    const classes = useStyles()

    console.log('props in login', props)
    let emailRef = useRef()
    let passwordRef = useRef()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

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


    // //  old code that work
    // const handleLogin = async (event) => {
    //     event.preventDefault()
    //     if (emailRef.current.value === '' || passwordRef.current.value === '') {
    //         alert("must fill in both email and password")
    //     }
    //     await props.login(emailRef.current.value, passwordRef.current.value)

    //     let userToken = await localStorage.getItem('userToken')

    //     if (userToken) {
    //         setIsAuth(true)
    //         history.push('/')
    //         props.handleErrorMessage(null)

    //     } else {
    //         setIsAuth(false)
    //     }
    // }
    const handleLogin = (e) => {
        console.log('is this run at all')
        e.preventDefault()
        console.log(email, password)
        // if (email === '' || password === '') {
        //     alert("must fill in both email and password")
        // }

        if (email && password) {
            console.log(email, password)
        }
        // await props.login(emailRef.current.value, passwordRef.current.value)

        // let userToken = await localStorage.getItem('userToken')

        // if (userToken) {
        //     setIsAuth(true)
        //     history.push('/')
        //     props.handleErrorMessage(null)

        // } else {
        //     setIsAuth(false)
        // }
    }

    return (
        <ThemeProvider theme={theme}>
            <>

                <Link to='/'>{`<- Go Home`}</Link>
                {isAuth ? <Redirect to='/' />
                    : <div>
                        <div>This is LOGIN page</div>
                        <p>props.errorMessage: {props.errorMessage}</p>

                        < form noValidate autoComplete='off' onSubmit={handleLogin} >
                            {/* < form  > */}
                            {/* <input ref={emailRef} placeholder='email' type='email'></input>
                                <input ref={passwordRef} placeholder='password' type='password'></input> */}
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                className={classes.field}
                                label='Email'
                                variant='outlined'
                                fullWidth
                                required />

                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className={classes.field}
                                label='Password'
                                variant='outlined'
                                fullWidth
                                required />

                            <Button color='primary' variant='contained'>LOGIN</Button>

                        </form >
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
export default connect(mapStateToProps, { login, handleErrorMessage })(Test);