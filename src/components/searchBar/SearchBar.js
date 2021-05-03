import React, { useRef } from 'react'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getNearbySearch, togglePlaceDetail, getSearchWord } from '../../stores/actions/searchActionCreator'

function SearchBar(props) {

    const history = useHistory()
    let searchRef = useRef()

    const handleSearch = (event) => {
        event.preventDefault()
        props.togglePlaceDetail(false)
        props.getNearbySearch(searchRef.current.value, props.userLatLng)
        props.getSearchWord(searchRef.current.value)
        searchRef.current.value = ''
        history.push('./')
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                ref={searchRef}
                placeholder='Search Place'>
            </input>
            <button>Search</button>
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
