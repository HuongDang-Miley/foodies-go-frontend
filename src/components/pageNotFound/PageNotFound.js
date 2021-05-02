import React from 'react'
import {Link} from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Oh no! This page does not exsist </h1>
            <Link to='/'>Go Home</Link>
        </div>
    )
}
