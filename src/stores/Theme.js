import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles({

    // for FavPlaceSummary Component
    card: {
        marginBottom: 1,
        width: 450
    },

    // for Login and Register Component
    field: {
        marginTop: 24,
        marginBottom: 24,
        display: 'block'
    },
    button: {
        marginBottom: 24,
    },

    container: {
        marginTop: 24,
        textAlign: 'center',
    },

    typography: {
        marginBottom: 32
    },

    successText: {
        color: green
    },

    // For sidebar topnav in Favorites, DirectionMap and HomePage Component
    navLink: {
        marginLeft: 16,
        color: 'white'
    },

    // Button for Direction Map
    directionsBtn: {
        marginTop: 16,
        marginRight: 16,
    },

    autoCompleteInput: {
        width: 400,
        height: 48
    }
})

export default useStyles