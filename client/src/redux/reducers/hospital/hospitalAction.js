import * as actionType from './hospitalActionType'

export const hospitalDoctors = (data) => {
    return {
        type: actionType.HOSPITAL_DOCTORS,
        payload: data
    }
}