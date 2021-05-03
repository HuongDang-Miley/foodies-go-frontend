import React, { useRef, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";

// MUI ELEMENTS
import { Paper, Button, TextField, createMuiTheme, ThemeProvider, Drawer, Typography, AppBar, Toolbar, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'
import HomeMap from '../maps/HomeMap';

const useStyle = makeStyles({
    drawer: {
        width: 400
    },
    drawerCard: {
        width: 400
    },

    appBar: {
        width: 100
    }

})
const Test = (props) => {

    console.log('props in Test', props)
    const classes = useStyle()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>


            {/* <div><HomeMap /></div> */}
            <div> Testing</div>
            <Paper>

                this is a paper
            </Paper>
            {/* <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{ paper: classes.drawerCard }}
            > */}
            {/* <AppBar className='classes.appBar'>
                    <Toolbar>
                        <Typography> This is The App</Typography>
                    </Toolbar>
                </AppBar> */}
            {/* <div>
                    <Typography variant='h5'>Test Drawer</Typography>
                </div>
            </Drawer> */}

            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Open Menu
      </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>{props.user.name}</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </>

    )
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.authReducer.errorMessage,
        user: state.authReducer.user
    }
}
export default connect(mapStateToProps, { login, handleErrorMessage })(Test);