import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/homePage/HomePage.js'
import Register from './components/register/Register.js'
import Login from './components/login/Login.js'
import Favorites from './components/favorites/Favorites.js'
// import Directions from './components/directions/Directions.js'
import PageNotFound from './components/pageNotFound/PageNotFound.js'
import DirectionsMap from "./components/maps/DirectionsMap.js";




export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/directions" component={DirectionsMap} />
        {/* <Route exact path="/directions" component={Directions} /> */}
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Router>
  );
}


