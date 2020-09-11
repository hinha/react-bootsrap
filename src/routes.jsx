import React, { Fragment } from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {SignInIam, SignInRoot} from "./components/Signin.jsx"; 
import Home from './components/Home.jsx';
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
    <BrowserRouter>
      <div className="mainWrapper">
    
        <Fragment>
          <Route path="/" exact component={HomeComponent}/>
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
