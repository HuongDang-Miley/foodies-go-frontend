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

    // console.log('props in login', props)
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


    // const handleSubmit = (e) => {
    //     e.preventDefault()

    // }
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setTitleError(false)
        setDetailsError(false)

        if (title == '') {
            setTitleError(true)
        }
        if (details == '') {
            setDetailsError(true)
        }
        if (title && details) {
            console.log(title, details)
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <>

                <Link to='/'>{`<- Go Home`}</Link>
                {isAuth ? <Redirect to='/' />
                    : <div>
                        <div>This is LOGIN page</div>
                        <p>props.errorMessage: {props.errorMessage}</p>

                        {/* < form noValidate autoComplete='off' onSubmit={handleSubmit} >
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

                        </form > */}
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField className={classes.field}
                                type='email'
                                onChange={(e) => setTitle(e.target.value)}
                                label="Note Title"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                required
                                error={titleError}
                            />
                            <TextField className={classes.field}
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setDetails(e.target.value)}
                                label="password"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                required
                                error={detailsError}
                            />

                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                            // endIcon={<KeyboardArrowRightIcon />}
                            >
                                Submit
        </Button>
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
export default connect(mapStateToProps, { login, handleErrorMessage })(Test);