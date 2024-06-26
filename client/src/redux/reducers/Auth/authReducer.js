import * as actionTypes from './authActionType'


const initialState = {
    token: null,
    Uid:null,
    role:null,
    userName:null,
    isUserLogin: false,
    addHamburgerClass:false
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.role,
                isUserLogin: true,
            }

        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                token: null,
                isUserLogin: false,
                role:null,
                UID:null,
            }

        case actionTypes.IS_USER_LOGINED:
            return {
                ...state,
                isUserLogin: true,
                UID:action.payload._id,
                role:action.payload.role
            }
        case actionTypes.NAVBAR_TOGGLE:
            return {
                ...state,
                addHamburgerClass:action.payload
            }

        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                token: null,
                role:null,
                isUserLogin: false,
                UID:null,
            }

        default:
            return state
    }
}