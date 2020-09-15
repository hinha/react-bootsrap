import React, { Fragment } from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route } from 'react-router-dom';
import {Provider} from "react-redux";
import {SignInIam, SignInRoot} from "./components/signin/Signin.jsx"; 
import Home from './components/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import {TitleComponent} from './components/Title.jsx';

// withTitle function
const withTitle = ({ component: Component, title }) => {
	return class Title extends React.Component {
		render() {
			return (
				<Fragment>
					<TitleComponent title={title} />
					<Component {...this.props} />
				</Fragment>
			);
		}
	};
};


const HomeComponent = withTitle({component: Home, title: "Swaping Home"})

export default function Routes() {
  return (
    <CookiesProvider>
        <BrowserRouter>
          <div className="mainWrapper">
        
            <Fragment>
              <Route path="/" exact component={HomeComponent}/>
              <Route path="/signin" exact component={SignInIam}/>
              <Route path="/dashboard" exact component={Dashboard}/>
            </Fragment>
          </div>
        </BrowserRouter>
    </CookiesProvider>
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
