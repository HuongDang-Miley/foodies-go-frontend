import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/homePage/HomePage.js'
import Register from './components/register/Register.js'
import Login from './components/login/Login.js'
import Favorites from './components/favorites/Favorites.js'
import Test from './components/test/Test.js'
import PageNotFound from './components/pageNotFound/PageNotFound.js'
import DirectionsMap from "./components/maps/DirectionsMap.js";
import { createMuiTheme,  ThemeProvider } from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
      primary: { main: red[700] },
      secondary: blue
  }
})


export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/directions" component={DirectionsMap} />
        <Route exact path="/test" component={Test} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Router>
    </ThemeProvider>
  );
}


