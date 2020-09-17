import React, { Fragment } from "react";
import { CookiesProvider } from "react-cookie";
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import {TitleComponent} from './components/Title.jsx';
import { SignInPage } from "./components/signin/index.js";
import { history } from './helpers/history';

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

class Routes extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        // this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <CookiesProvider>
          <Router history={history}>
            <div className="mainWrapper">
          
              <Fragment>
                <Route path="/" exact component={HomeComponent}/>
                <RouteWrapper path="/signin" exact component={SignInPage} alert={alert}/>
                <PrivateRoute path="/dashboard" exact component={Dashboard}/>
              </Fragment>
            </div>
          </Router>
      </CookiesProvider>
    );
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      localStorage.getItem('user')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
  )} />
)

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

function RouteWrapper({
  component: Component, 
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
        <Component {...props} />
    } />
  );
}
const App = connect(mapStateToProps)(Routes);
export default App; 

