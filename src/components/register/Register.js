import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";

const Register = (props) => {
    let nameRef = useRef()
    let emailRef = useRef()
    let passwordRef = useRef()

    const handleRegister = (event) => {
        event.preventDefault()
        if (nameRef.current.value === ''
            || emailRef.current.value === ''
            || passwordRef.current.value === ''
        ) { alert("must fill in both email and password") }
        props.register(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
        nameRef.current.value = ''
        emailRef.current.value = ''
        passwordRef.current.value = ''
    }

    return (
        < div >
            <div>This is Register</div>
            { props.state.registerMessage === '' ? null : <p>{props.state.registerMessage}.   <Link to='/login'>Login here</Link></p>}
            < form onSubmit={handleRegister} >
                <input ref={nameRef} placeholder='username' type='text'></input>
                <input ref={emailRef} placeholder='email' type='email'></input>
                <input ref={passwordRef} placeholder='password' type='password'></input>
                <button>Register</button>
                <Link to='/login'>Already Have An Account? Login here</Link>
            </form >
        </div >
    )
}


const mapStateToProps = (state) => {
    return {
        state: state.authReducer
    }
}
export default connect(mapStateToProps, { register })(Register);