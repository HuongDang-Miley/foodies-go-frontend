import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles({

    // for FavPlaceSummary Component
    card: {
        marginBottom: 2
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
    }
})

export default useStyles