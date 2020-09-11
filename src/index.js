import React from "react";
import ReactDOM from "react-dom";

import App from "./routes.jsx";
import service from "./serviceWorker";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


service();
const ROOT = document.getElementById("app");
ReactDOM.render( < App / > , ROOT);
