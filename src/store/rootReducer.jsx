import authentication from './user.auth.reducer.jsx';
import projectReducer from './projectReducer.jsx';
import { combineReducers } from 'redux';
import { alert } from './alert.reducer.jsx';

const rootReducer = combineReducers({
    authentication: authentication,
    alert: alert
});

export default rootReducer;
