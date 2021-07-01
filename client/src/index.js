import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'
import reducers from './reducers/index'
import reduxThunk from 'redux-thunk'
import 'materialize-css/dist/css/materialize.min.css'//for using materialize css we just need to install with npm and than import it like that

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));//args:reducers,state,middleware

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root'));