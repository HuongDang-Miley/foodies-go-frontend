import React, { useRef } from 'react'
import './modal.css'


export default function AddNoteModal(props) {
    let noteRef = useRef()

    const handleAddNote = () => {
        props.addNote(
            props.favList,
            props.userId,
            props.place.place_id,
            noteRef.current.value)
        props.setOpenAddNoteModal(false)
    }

    return (
        <div className='modal-background'>
            <div className='modal-wrapper'>
                <button className='close-btn' onClick={() => props.setOpenAddNoteModal(false)}>x</button>
                <h3>Add note</h3>
                <p>Place: {props.place.name}</p>
                <input className='modal-input' placeholder="Type your note here" ref={noteRef} />
                <div className='btn-wrapper'>
                    <button onClick={() => props.setOpenAddNoteModal(false)}>Cancel</button>
                    <button className='add-note-btn'
                        onClick={() => handleAddNote()}>{props.place.note === null ? "Add Note" : "Edit Note"}</button>
                </div>
            </div>
        </div>
    )
}

