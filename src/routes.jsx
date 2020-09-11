import React, { Fragment } from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {SignInIam, SignInRoot} from "./components/Signin.jsx"; 
import Home from './components/Home.jsx';

export default function Routes() {
  return (
    <BrowserRouter>
      <div className="mainWrapper">
    
        <Fragment>
          <Route path="/" exact component={Home}/>
          <Route path="/sign/iam" exact component={SignInIam}/>
          <Route path="/sign/root" exact component={SignInRoot}/>
        </Fragment>
      </div>
    </BrowserRouter>
  );
}

// function RouteWrapper({
//   component: Component, 
//   layout: Layout,
//   ...rest
// }) {
//   return (
//     <Route {...rest} render={(props) =>
//       <Layout {...props}>
//         <Component {...props} />
//       </Layout>
//     } />
//   );
// }
