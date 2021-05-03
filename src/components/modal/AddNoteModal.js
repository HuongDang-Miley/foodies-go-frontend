import React, { useRef, useState } from 'react'
import './modal.css'

// MUI elements
import { Button, TextField, Link, Container, Typography, Card, IconButton, makeStyles, CardHeader } from '@material-ui/core'
// import  useStyles from '../../stores/Theme.js'
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({
    closeBtn: {
        float: 'right'
    },

    modal: {
        marginTop: 100,
        padding: 24,
        margin: '0 auto',
        width: '30%',
    },

    modalBtn: {
        marginLeft: 16,
        marginTop: 16,
    },
})

export default function AddNoteModal(props) {
    const classes = useStyles()
    let noteRef = useRef()
    const [value, setValue] = useState('')

    const handleAddNote = () => {
        if (value) {
            props.addNote(
                props.favList,
                props.userId,
                props.place.place_id,
                value)
            // noteRef.current.value)
            props.setOpenAddNoteModal(false)
        }
    }

    return (
        <div className='modal-background'>
            {/* <Container maxWidth="lg"> */}
            <Card className={classes.modal}>
                <CardHeader
                    title='Add note'
                    subheader={`Place: ${props.place.name}`}
                    action={
                        <IconButton className={classes.closeBtn} onClick={() => props.setOpenAddNoteModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    }
                />
                <TextField
                    className={classes.modalField}
                    type="text"
                    // autoComplete="current-password"
                    onChange={(e) => setValue(e.target.value)}
                    label="Type your note here"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    required
                />
                <div className='btn-wrapper'>
                    <Button
                        className={classes.modalBtn}
                        variant='default'
                        onClick={() => props.setOpenAddNoteModal(false)}
                    >Cancel</Button>
                    <Button
                        className={classes.modalBtn}
                        // className='add-note-btn'
                        variant='contained'
                        color='secondary'
                        onClick={() => handleAddNote()}>
                        {props.place.note === null ? "Add Note" : "Edit Note"}
                    </Button>
                </div>

            </Card>
            {/* </Container> */}
        </div>
    )
}

// import React, { useRef } from 'react'
// import './modal.css'

// // MUI elements
// import { Button, TextField, Link, Container, Typography, Card, IconButton } from '@material-ui/core'
// import  useStyles from '../../stores/Theme.js'
// import CloseIcon from '@material-ui/icons/Close';


// export default function AddNoteModal(props) {
//     let noteRef = useRef()

//     const handleAddNote = () => {
//         props.addNote(
//             props.favList,
//             props.userId,
//             props.place.place_id,
//             noteRef.current.value)
//         props.setOpenAddNoteModal(false)
//     }

//     return (
//         <div className='modal-background'>
//             <Container maxWidth="sm">
//             <Card>
//             <div className='modal-wrapper'>
//                 <button className='close-btn' onClick={() => props.setOpenAddNoteModal(false)}>x</button>
//                 <h3>Add note</h3>
//                 <p>Place: {props.place.name}</p>
//                 <input className='modal-input' placeholder="Type your note here" ref={noteRef} />
//                 <div className='btn-wrapper'>
//                     <button onClick={() => props.setOpenAddNoteModal(false)}>Cancel</button>
//                     <button className='add-note-btn'
//                         onClick={() => handleAddNote()}>{props.place.note === null ? "Add Note" : "Edit Note"}</button>
//                 </div>
//             </div>
//             </Card>
//             </Container>
//         </div>
//     )
// }

