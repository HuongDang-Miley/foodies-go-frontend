import React, { useState } from 'react'
import { register } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'

import { Button, TextField, Link, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

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


const Register = (props) => {
    const classes = useStyles()
    let history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

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
            // setName('')
            // setEmail('')
            // setPassword('')
        }
    }

    return (
        <Container maxWidth="sm" className={classes.container}>
            <img src="foodies-go-big-logo.svg" alt="logo" style={{ marginTop: 16, marginBottom: 8, textAlign: 'left' }}></img>

            {props.errorRegisterMessage ?
                <p style={{ color: 'red' }}>{props.errorRegisterMessage}
                    <Link
                        color='secondary'
                        onClick={() => history.push('/login')}
                    > Login Here
               </Link></p> : null}

            {props.successRegisterMessage ?
                <p style={{ color: 'green' }}>{props.successRegisterMessage}!
                    <Link
                        color='secondary'
                        onClick={() => history.push('/login')}
                    > Login Here
                </Link></p> : null}

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
        // state: state.authReducer,
        successRegisterMessage: state.authReducer.successRegisterMessage,
        errorRegisterMessage: state.authReducer.errorRegisterMessage,
    }
}
export default connect(mapStateToProps, { register })(Register);


//=================================================================================
// Start Original Code
//=================================================================================


// import React, { useRef } from 'react'
// import { Link } from 'react-router-dom'
// import { register } from '../../stores/actions/authActionCreator'
// import { connect } from "react-redux";

// const Register = (props) => {
//     let nameRef = useRef()
//     let emailRef = useRef()
//     let passwordRef = useRef()

//     const handleRegister = (event) => {
//         event.preventDefault()
//         if (nameRef.current.value === ''
//             || emailRef.current.value === ''
//             || passwordRef.current.value === ''
//         ) { alert("must fill in both email and password") }
//         props.register(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
//         nameRef.current.value = ''
//         emailRef.current.value = ''
//         passwordRef.current.value = ''
//     }

//     return (
//         < div >
//             <div>This is Register</div>
//             { props.state.registerMessage === '' ? null : <p>{props.state.registerMessage}.   <Link to='/login'>Login here</Link></p>}
//             < form onSubmit={handleRegister} >
//                 <input ref={nameRef} placeholder='username' type='text'></input>
//                 <input ref={emailRef} placeholder='email' type='email'></input>
//                 <input ref={passwordRef} placeholder='password' type='password'></input>
//                 <button>Register</button>
//                 <Link to='/login'>Already Have An Account? Login here</Link>
//             </form >
//         </div >
//     )
// }


// const mapStateToProps = (state) => {
//     return {
//         state: state.authReducer
//     }
// }
// export default connect(mapStateToProps, { register })(Register);


// =================================================================================
// End Original Code
// =================================================================================