import * as actionTypes from './hospitalActionType'

const initialState = {
    doctors:[]
}

export const hospitalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HOSPITAL_DOCTORS:
            return {
                ...state,
                doctors: Array.isArray(action.payload) ? action.payload: [] 
            }

        default:
            return state
    }
}