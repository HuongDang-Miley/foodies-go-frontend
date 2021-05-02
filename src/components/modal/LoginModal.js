import React from 'react'
import {useHistory } from 'react-router-dom';
import './modal.css'

export default function LoginModal() {
    const history = useHistory()
    return (
        <div className='modal-background'>
            <div className='modal-wrapper'>
                <button className='close-btn' onClick={()=> history.push('/')}>x</button>
                <p>You Must Login To See Favorites</p>
                <button onClick={()=> history.push('/login')}>Click Login</button>
                <button onClick={()=> history.push('/')}>Cancel</button>
            </div>
        </div>
    )
}

