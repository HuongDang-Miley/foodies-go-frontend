import React, { useRef, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login, handleErrorMessage } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";

// MUI ELEMENTS
import { Paper, Button, TextField, createMuiTheme, ThemeProvider, Drawer, Typography, AppBar, Toolbar, Menu, MenuItem, Container, Grid } from '@material-ui/core'
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
    },
    sideBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        backgroundColor: 'red',
        height: '100wh'
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
        <div>
          <Paper className={classes.sideBar}>
              This is container
          </Paper>
            {/* <div><HomeMap /></div> */}
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.authReducer.errorMessage,
        user: state.authReducer.user
    }
}
export default connect(mapStateToProps, { login, handleErrorMessage })(Test);