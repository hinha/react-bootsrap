import React from "react";
import ReactDOM from "react-dom";

import App from "./routes.jsx";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import store from "./Store.jsx";

import service from "./serviceWorker";
import rootReducer from './store/rootReducer.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./assets/css/main.css";
import "./assets/css/form.css";
import { configureFakeBackend } from './components/signin/fake-backends';
configureFakeBackend();

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
))

service();
const ROOT = document.getElementById("app");
ReactDOM.render( 
    <Provider store={store}>
         < App / >
    </Provider>
,ROOT);
