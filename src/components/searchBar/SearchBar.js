import React, { useRef, useState } from 'react'
import './searchBar.css'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getNearbySearch, togglePlaceDetail, getSearchWord } from '../../stores/actions/searchActionCreator'
import { Button, TextField, Link, Container, Typography } from '@material-ui/core'
import useStyles from '../../stores/Theme.js'
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
    const classes = useStyles()

    const history = useHistory()
    let searchRef = useRef()
    const [keyWord, setKeyWord] = useState('')
    const [value, setValue] = useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        props.togglePlaceDetail(false)
        props.getNearbySearch(searchRef.current.value, props.userLatLng)
        props.getSearchWord(searchRef.current.value)
        searchRef.current.value = ''
        history.push('./')
    }

    return (
        <form onSubmit={handleSearch} className='search-wrapper'>
                <input
                    className='search-input'
                    ref={searchRef}
                    placeholder='Search Place'>
                </input>
            {/* <TextField
                value={keyWord}
                className={classes.field}
                // type='email'
                onChange={(e) => setValue({ keyWord: e.target.value })}
            // label="Email"
            // variant="outlined"
            // fullWidth
            // required
            // error={emailError}
            />
            <button>Search</button> */}
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        userLatLng: state.authReducer.userLatLng,
    }
}
export default connect(mapStateToProps, { getNearbySearch, togglePlaceDetail, getSearchWord })(SearchBar)


/******************************************************************************************************************************
*                    Start Original Code
******************************************************************************************************************************/

// import React, { useRef } from 'react'
// import { connect } from "react-redux";
// import { useHistory } from 'react-router-dom';
// import { getNearbySearch, togglePlaceDetail, getSearchWord } from '../../stores/actions/searchActionCreator'

// function SearchBar(props) {

//     const history = useHistory()
//     let searchRef = useRef()

//     const handleSearch = (event) => {
//         event.preventDefault()
//         props.togglePlaceDetail(false)
//         props.getNearbySearch(searchRef.current.value, props.userLatLng)
//         props.getSearchWord(searchRef.current.value)
//         searchRef.current.value = ''
//         history.push('./')
//     }

//     return (
//         <form onSubmit={handleSearch}>
//             <input
//                 ref={searchRef}
//                 placeholder='Search Place'>
//             </input>
//             <button>Search</button>
//         </form>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         userLatLng: state.authReducer.userLatLng,
//     }
// }
// export default connect(mapStateToProps, { getNearbySearch, togglePlaceDetail, getSearchWord })(SearchBar)
