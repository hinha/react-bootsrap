import { userConstants } from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem("user"));
console.log("is user: ", user)
const initState = user ? {loggedIn: true, user} : {};

const authentication = (state = initState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGOUT:
            return {}
        default:
            return state
    }
}

export default authentication;