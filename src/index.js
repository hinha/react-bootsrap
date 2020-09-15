import React from "react";
import ReactDOM from "react-dom";

import App from "./routes.jsx";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import store from "./Store.jsx";

import service from "./serviceWorker";
import rootReducer from './store/rootReducer.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./assets/css/main.css";
import "./assets/css/form.css";


const store = createStore(rootReducer)

service();
const ROOT = document.getElementById("app");
ReactDOM.render( 
    <Provider store={store}>
         < App / >
    </Provider>
,ROOT);
