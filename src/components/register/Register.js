import React, { useState, useEffect } from 'react'
import { register } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Button, TextField, Link, Container, Typography } from '@material-ui/core'
import  useStyles from '../../stores/Theme.js'


const Register = (props) => {
    const classes = useStyles()
    let history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)


    useEffect(() => {
        setSuccessMessage(props.successRegisterMessage)
        setErrorMessage(props.errorRegisterMessage)
    }, [showMessage])

    const handleRegister = async (e) => {
        e.preventDefault()
        setEmailError(false)
        setPasswordError(false)

        if (name === '') {
            setNameError(true)
        }
        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }
        if (name && email && password) {
            await props.register(name, email, password)
            setSuccessMessage(props.successRegisterMessage)
            setErrorMessage(props.errorRegisterMessage)
            setShowMessage(true)
        }
    }

    return (
        <Container maxWidth="sm" className={classes.container}>
            <img src="foodies-go-big-logo.svg" alt="logo" style={{ marginTop: 24 }}></img>
            {showMessage ?
                <>
                    <p style={{ color: 'red', marginTop: 23, marginBottom: 24 }}>
                        {errorMessage}
                    </p>

                    <p style={{ color: 'green', marginTop: 24, marginBottom: 24 }}>
                        {successMessage}
                    </p>
                </>
                : null}

            <form noValidate autoComplete="off" onSubmit={handleRegister}>

                <TextField className={classes.field}
                    type='name'
                    onChange={(e) => setName(e.target.value)}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    error={nameError}
                />

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
                >Register</Button>
            </form>

            <Typography className={classes.typography}>
                {`Already Have An Account?  `}
                <Link
                    color='secondary'
                    onClick={() => history.push('/login')}
                > Login Here</Link>
            </Typography>

            <Link
                color='secondary'
                onClick={() => history.push('/')}
            >Back to search</Link>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        successRegisterMessage: state.authReducer.successRegisterMessage,
        errorRegisterMessage: state.authReducer.errorRegisterMessage,
    }
}
export default connect(mapStateToProps, { register })(Register);


