import React from 'react'
import './placeSummary.css'
import { connect } from 'react-redux'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { mouseEnter } from '../../stores/actions/mapActionCreator'
import { converRatingToStar, convertPriceLevel, upperCaseFirstChar } from '../../stores/actions/displayActionsCreator'

// MUI elements
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core'
import useStyles from '../../stores/Theme.js'


function PlaceSummary(props) {
    // console.log('props from PlaceSummary', props)
    const classes = useStyles()

    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
        props.mouseEnter(null)
    }

    const businessStatus = (item) => {
        if (item.business_status === 'CLOSED_TEMPORARILY') { return 'Close Temporarily' }
        if (item.business_status === 'OPERATIONAL') {
            if (item.opening_hours.open_now) { return 'Open Now' }
            return 'Close'
        }
    }
    return (
        <Card className={classes.card}>
            <CardContent
                onClick={() => handleShowPlaceDetail(props.place.place_id)}
                onMouseEnter={() => props.mouseEnter(props.place)}
            >
                <Typography variant="h5" color="textPrimary" component="p">
                    {props.place.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {`${props.place.rating} `}
                    <img src={converRatingToStar(props.place.rating)} alt={props.place.rating} height={16} />
                    {` (${props.place.user_ratings_total}) ${convertPriceLevel(props.place.price_level)}`}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {props.place.vicinity}
                </Typography>
                {/* <Typography variant="body1" color={businessStatus(props.place) === 'Open Now' ? "success" : 'textSecondary'}  component="p"> */}
                <Typography variant="body1" color="textSecondary" component="p">
                    {businessStatus(props.place)}
                </Typography>
            </CardContent>
        </Card>

    )
}

const mapStateToProps = (state) => {
    return {
        favPlaces: state.favReducer,
    }
}

export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(PlaceSummary)


//=================================================================================
// START ORIGINAL CODE
//=================================================================================

// import React from 'react'
// import './placeSummary.css'
// import { connect } from 'react-redux'
// import { AddToFavorites } from '../../stores/actions/favActionCreator'
// import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
// import { mouseEnter } from '../../stores/actions/mapActionCreator'
// import { converRatingToStar, convertPriceLevel, upperCaseFirstChar } from '../../stores/actions/displayActionsCreator'

// // MUI elements
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import { Button,  IconButton, Link, Typography } from '@material-ui/core'
// import DeleteIcon from '@material-ui/icons/Delete';
// import  useStyles from '../../stores/Theme.js'


// function PlaceSummary(props) {
//     // console.log('props from PlaceSummary', props)

//     const handleShowPlaceDetail = (id) => {
//         props.togglePlaceDetail(true)
//         props.getPlaceDetail(id)
//         props.mouseEnter(null)
//     }

//     const businessStatus = (item) => {
//         if (item.business_status === 'CLOSED_TEMPORARILY') { return 'Close Temporarily' }
//         if (item.business_status === 'OPERATIONAL') {
//             if (item.opening_hours.open_now) { return 'Open Now' }
//             return 'Close'
//         }
//     }
//     return (
//         <div className='place-summary'>
//             <div
//                 onClick={() => handleShowPlaceDetail(props.place.place_id)}
//                 onMouseEnter={() => props.mouseEnter(props.place)} 
//             >
//                 <h2>{props.place.name}</h2>
//                 <p>Rating:{props.place.rating}</p>
//                 <p>Total Ratings:{props.place.user_ratings_total}</p>
//                 <p>Price:{props.place.price_level}</p>
//                 <p>{props.place.vicinity}, {props.place.plus_code.compound_code}</p>
//                 <p>{businessStatus(props.place)}</p>
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         favPlaces: state.favReducer,
//     }
// }

// export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(PlaceSummary)


