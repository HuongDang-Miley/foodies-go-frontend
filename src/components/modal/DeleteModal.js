import React from 'react'
import './modal.css'

// MUI elements
import { Button, Typography, Card, CardActions } from '@material-ui/core'
import useStyles from '../../stores/Theme.js'

export default function DeleteModal(props) {
    const classes = useStyles()

    const handleDeletePlace = () => {
        props.deletePlace(props.favList, props.userId, props.placeId)
        props.setOpenDeleteModal(false)
    }


    return (
        <div className='modal-background'>

            <Card className={classes.modal}>
                <Typography variant='h6'>You will lose note of this place</Typography>
                <div>
                    <input
                        type='checkbox'
                        defaultChecked={props.disableDeleteModal}
                        onChange={() => props.setDisableDeleteModal(!props.disableDeleteModal)}
                    />Don't Show This Box Again

                    </div>
                <CardActions>
                    <div className='btn-wrapper'>
                        <Button
                            className={classes.modalBtn}
                            variant='default'
                            onClick={() => props.setOpenDeleteModal(false)}
                        >Cancel</Button>
                        <Button
                            className={classes.modalBtn}
                            variant='contained'
                            color='primary'
                            onClick={() => handleDeletePlace()}
                        >
                            Delete Place
                    </Button>
                    </div>


                </CardActions>

            </Card>

            {/* <div className='modal-wrapper'>
                <button className='close-btn' onClick={() => props.setOpenDeleteModal(false)}>x</button>
                <p>You will lose note of this place</p>
                <button onClick={() => handleDeletePlace()}>Delete Place</button>
                <div>
                    <input
                        type='checkbox'
                        defaultChecked={props.disableDeleteModal}
                        onChange={() => props.setDisableDeleteModal(!props.disableDeleteModal)}
                    />Don't Show This Box Again
                </div>

            </div> */}

        </div>
    )
}

// import React from 'react'
// import './modal.css'

// export default function DeleteModal(props) {

//     const handleDeletePlace = () => {
//         props.deletePlace(props.favList, props.userId, props.placeId)
//         props.setOpenDeleteModal(false)
//     }


//     return (
//         <div className='modal-background'>
//             <div className='modal-wrapper'>
//                 <button className='close-btn' onClick={() => props.setOpenDeleteModal(false)}>x</button>
//                 <p>You will lose note of this place</p>
//                 <button onClick={() => handleDeletePlace()}>Delete Place</button>
//                 <div>
//                     <input
//                         type='checkbox'
//                         defaultChecked={props.disableDeleteModal}
//                         onChange={() => props.setDisableDeleteModal(!props.disableDeleteModal)}
//                     />Don't Show This Box Again
//                 </div>

//             </div>
//         </div>
//     )
// }

