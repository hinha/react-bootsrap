const { loginRoot } = require("./user.service");
import { userConstants } from '../constants/user.constants';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';

function actionLoginRoot(email, password, code) {
    return dispatch => {
        dispatch(request({email}));;

        loginRoot(email, password, code)
            .then(
                user => {
                    dispatch(success(user));
                    history.push("/dashboard");
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            )
    }
    
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export { actionLoginRoot };