import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import './App.css';
import {store, ConnectedApp} from './Store/Store';
import 'rxjs'; // Observable
import {configureStore} from './Store/configureStore';
// Container component
ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);