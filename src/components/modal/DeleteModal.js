import React from 'react'
import './modal.css'

export default function DeleteModal(props) {

    const handleDeletePlace = () => {
        props.deletePlace(props.favList, props.userId, props.placeId)
        props.setOpenDeleteModal(false)
    }


    return (
        <div className='modal-background'>
            <div className='modal-wrapper'>
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

            </div>
        </div>
    )
}

