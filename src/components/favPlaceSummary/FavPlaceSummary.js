import React, { useState } from 'react'
import { connect } from 'react-redux'
import './favPlaceSummary.css'
import AddNoteModal from '../modal/AddNoteModal'
import DeleteModal from '../modal/DeleteModal'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { mouseEnter } from '../../stores/actions/mapActionCreator'
import { converRatingToStar, convertPriceLevel, upperCaseFirstChar } from '../../stores/actions/displayActionsCreator'

// MUI elements
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Button, IconButton, Link, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../../stores/Theme.js'



function FavPlaceSummary(props) {
    const classes = useStyles()

    let [openAddNoteModal, setOpenAddNoteModal] = useState(false)
    let [openDeleteModal, setOpenDeleteModal] = useState(false)

    //=================================================================================
    // Functions
    //=================================================================================

    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(false)
        props.setShowFavPlaceDetail(true)
        props.getPlaceDetail(id)
        props.mouseEnter(null)
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                title={props.place.name}
                subheader={upperCaseFirstChar(`${props.place.types[0]}, ${props.place.types[1]}, ${props.place.types[2]}`)}
                action={
                    <IconButton
                        onClick={() => {
                            props.disableDeleteModal
                                ? props.deletePlace(props.favList, props.userId, props.place.place_id)
                                : setOpenDeleteModal(true)
                        }}
                    > <DeleteIcon />
                    </IconButton>
                }
            />

            <CardContent

                onMouseEnter={() => props.mouseEnter(props.place)}
            >
                <Button variant="outlined" style={{ marginBottom: 8 }}
                    onClick={() => handleShowPlaceDetail(props.place.place_id)}
                >
                    See Detail
                </Button>
                <Typography variant="body1" color="textSecondary" component="p">
                    {`${props.place.rating} `}
                    <img src={converRatingToStar(props.place.rating)} alt={props.place.rating} height={16} />
                    {` (${props.place.reviews}) ${convertPriceLevel(props.place.price_level)}`}
                </Typography>

                <Link style={{cursor: 'pointer'}}color='secondary' variant='body2'> {props.place.website}</Link>

                <Typography variant="body1" color="textSecondary" component="p">
                    {props.place.vicinity}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {props.place.formatted_phone_number}
                </Typography>
                <Typography variant="body" color="textSecondary" component="p" spacing='2'>
                    {props.place.note}
                </Typography>
            </CardContent>


            <CardActions>
                <Button variant="outlined" style={{ marginBottom: 8 }}
                    onClick={() => setOpenAddNoteModal(true)}
                >
                    {props.place.note === null ? "Add Note" : "Edit Note"}
                </Button>

                {props.place.note === null
                    ? null
                    : <Button style={{ marginBottom: 8 }} onClick={() => props.deleteNote(props.favList, props.userId, props.place.place_id)}>Delete Note</Button>}


            </CardActions>
            {/* {props.disableDeleteModal
                ? <button className='delete-btn' onClick={() => props.deletePlace(props.favList, props.userId, props.place.place_id)}>Delete From Favorites outside ternary</button>
                : <button className='delete-btn' onClick={() => setOpenDeleteModal(true)}>Delete From Favorites</button>
            } */}
            {/* <div
                onClick={() => handleShowPlaceDetail(props.place.place_id)}
                onMouseEnter={() => props.mouseEnter(props.place)}
            > */}
            {/* <p>{props.place.name}</p> */}
            {/* <p>{props.place.rating}</p>
                <p>{props.place.price_level}</p>
                <p>{props.place.website}</p>
                <p>{props.place.vicinity}</p>
                <p>{props.place.formatted_phone_number}</p>
                <p>{props.place.note}</p> */}
            {/* </div> */}
            {/* <button onClick={() => setOpenAddNoteModal(true)}>{props.place.note === null ? "Add Note" : "Edit Note"}</button> */}
            {/* {props.place.note === null
                ? null
                : <button onClick={() => props.deleteNote(props.favList, props.userId, props.place.place_id)}>Delete Note</button>} */}

            {openAddNoteModal ?
                <AddNoteModal
                    setOpenAddNoteModal={setOpenAddNoteModal}
                    addNote={props.addNote}
                    userId={props.userId}
                    place={props.place}
                    favList={props.favList}
                /> : null}

            {openDeleteModal ?
                <DeleteModal
                    disableDeleteModal={props.disableDeleteModal}
                    setDisableDeleteModal={props.setDisableDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    deletePlace={props.deletePlace}
                    userId={props.userId}
                    placeId={props.place.place_id}
                    favList={props.favList}
                /> : null}
        </Card>

    )
}

const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(FavPlaceSummary)


//=================================================================================
// START ORIGINAL CODE
//=================================================================================
// import React, { useState } from 'react'
// import { connect } from 'react-redux'
// import './favPlaceSummary.css'
// import AddNoteModal from '../modal/AddNoteModal'
// import DeleteModal from '../modal/DeleteModal'
// import { AddToFavorites } from '../../stores/actions/favActionCreator'
// import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
// import { mouseEnter } from '../../stores/actions/mapActionCreator'


// function FavPlaceSummary(props) {

//     let [openAddNoteModal, setOpenAddNoteModal] = useState(false)
//     let [openDeleteModal, setOpenDeleteModal] = useState(false)

//     const handleShowPlaceDetail = (id) => {
//         props.togglePlaceDetail(false)
//         props.setShowFavPlaceDetail(true)
//         props.getPlaceDetail(id)
//         props.mouseEnter(null)
//     }

//     return (
//         <div className='fav-place-detail-wrapper'>
//             {props.disableDeleteModal
//                 ? <button className='delete-btn' onClick={() => props.deletePlace(props.favList, props.userId, props.place.place_id)}>Delete From Favorites outside ternary</button>
//                 : <button className='delete-btn' onClick={() => setOpenDeleteModal(true)}>Delete From Favorites</button>
//             }
//             <div
//                 onClick={() => handleShowPlaceDetail(props.place.place_id)}
//                 onMouseEnter={() => props.mouseEnter(props.place)}
//             >
//                 <p>{props.place.name}</p>
//                 <p>{props.place.rating}</p>
//                 <p>{props.place.price_level}</p>
//                 <p>{props.place.website}</p>
//                 <p>{props.place.vicinity}</p>
//                 <p>{props.place.formatted_phone_number}</p>
//                 <p>{props.place.note}</p>
//             </div>
//             <button onClick={() => setOpenAddNoteModal(true)}>{props.place.note === null ? "Add Note" : "Edit Note"}</button>
//             {props.place.note === null
//                 ? null
//                 : <button onClick={() => props.deleteNote(props.favList, props.userId, props.place.place_id)}>Delete Note</button>}

//             {openAddNoteModal ?
//                 <AddNoteModal
//                     setOpenAddNoteModal={setOpenAddNoteModal}
//                     addNote={props.addNote}
//                     userId={props.userId}
//                     place={props.place}
//                     favList={props.favList}
//                 /> : null}

//             {openDeleteModal ?
//                 <DeleteModal
//                     disableDeleteModal={props.disableDeleteModal}
//                     setDisableDeleteModal={props.setDisableDeleteModal}
//                     setOpenDeleteModal={setOpenDeleteModal}
//                     deletePlace={props.deletePlace}
//                     userId={props.userId}
//                     placeId={props.place.place_id}
//                     favList={props.favList}
//                 /> : null}
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         favList: state.favReducer.favList,
//         showPlaceDetail: state.searchReducer.showPlaceDetail,
//     }
// }

// export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(FavPlaceSummary)

//=================================================================================
// END ORIGINAL CODE
//=================================================================================