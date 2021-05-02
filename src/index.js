import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import authReducer from './stores/reducers/authReducer.js'
import searchReducer from './stores/reducers/searchReducer.js'
import favReducer from './stores/reducers/favReducer.js'
import mapReducer from './stores/reducers/mapReducer.js'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  authReducer: authReducer,
  favReducer: favReducer,
  mapReducer: mapReducer,
})

const rootStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
