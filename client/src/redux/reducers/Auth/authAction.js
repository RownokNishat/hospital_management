import * as actionType from './authActionType'

export const loginSuccess = (token) => {
    return {
        type: actionType.LOGIN_SUCCESS,
        payload: token
    }
}
export const loginFailed = () => {
    return {
        type: actionType.LOGIN_FAILED,
    }
}
export const IsUserLogined = (data) => {
    return {
        type: actionType.IS_USER_LOGINED,
        payload: data
    }
}
export const userLogOut = () => {
    return {
        type: actionType.USER_LOGOUT,
    }
}
export const navbarToggle = (data) => {
    return {
        type: actionType.NAVBAR_TOGGLE,
        payload: data
    }
}
