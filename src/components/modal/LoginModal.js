import React from 'react'
import { useHistory } from 'react-router-dom';
import './modal.css'

// MUI elements
import { Button, Typography, Card } from '@material-ui/core'
import  useStyles from '../../stores/Theme.js'

export default function LoginModal() {
    const classes = useStyles()
    const history = useHistory()
    return (
        <div className='modal-background'>
            <Card className={classes.modal}>
               <Typography variant='h8'>You Must Login To See Favorites</Typography>
                <div className='btn-wrapper'>
                    <Button
                        className={classes.modalBtn}
                        variant='default'
                        onClick={() => history.push('/')}
                    >Cancel</Button>
                    <Button
                        className={classes.modalBtn}
                        variant='contained'
                        color='secondary'
                        onClick={() => history.push('/login')}
                    >
                        Login
                    </Button>
                </div>

            </Card>
        </div>
    )
}

// import React from 'react'
// import {useHistory } from 'react-router-dom';
// import './modal.css'

// // MUI elements
// import { Button, TextField, Link, Container, Typography, Card, IconButton, makeStyles, CardHeader } from '@material-ui/core'
// // import  useStyles from '../../stores/Theme.js'
// import CloseIcon from '@material-ui/icons/Close';

// export default function LoginModal() {
//     const history = useHistory()
//     return (
//         <div className='modal-background'>
//             <div className='modal-wrapper'>
//                 <button className='close-btn' onClick={()=> history.push('/')}>x</button>
//                 <p>You Must Login To See Favorites</p>
//                 <button onClick={()=> history.push('/login')}>Click Login</button>
//                 <button onClick={()=> history.push('/')}>Cancel</button>
//             </div>
//         </div>
//     )
// }

