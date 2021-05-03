import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";
import { Button, TextField, Link, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    field: {
        marginTop: 24,
        marginBottom: 24,
        display: 'block'
    },
    button: {
        marginBottom: 24,
    },
    link: {
        color: 'secondary'
    },

    container: {
        marginTop: 24,
        textAlign: 'center',
    },

    typography: {
        marginBottom: 32
    },

    icon: {
        margin: 8
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
        <Container maxWidth="sm" className={classes.container}>
            {isAuth ? <Redirect to='/' />
                : <div>
                    <img src="foodies-go-big-logo.svg" alt="logo" style={{ marginTop: 16, textAlign: 'left' }}></img>
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
                            className={classes.button}
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                        >Login</Button>
                    </form>


                    <Typography className={classes.typography}>
                        {`Don't Have An Account? `}
                        <Link
                            color='secondary'
                            onClick={() => history.push('/register')}
                        >
                            Register Here
                            </Link>
                    </Typography>


                    <Link
                        color='secondary'
                        onClick={() => history.push('/')}
                    >Back to search</Link>


                </div>}

        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.authReducer.errorMessage
    }
}
export default connect(mapStateToProps, { login, handleErrorMessage })(Login);

