import * as actionType from './prescriptionActionType'

export const prescriptionData = (data) => {
    return {
        type: actionType.PRESCRIPTION_DATA_QUEUE,
        payload: data
    }
}
export const isSystemOnline = (data) => {
    return {
        type: actionType.SYSTEM_ONLINE,
        payload: data
    }
}
export const prescriptionData_peek_dequeue = (headers) => {
    return {
        type: actionType.PRESCRIPTION_DATA_PEEK_DEQUEUE,
        payload: headers
    }
}
export const drugTypes = (data) => {
    return {
        type: actionType.DRUG_TYPE,
        payload: data
    }
}
export const drugNames = (data) => {
    return {
        type: actionType.DRUG_NAME,
        payload: data
    }
}
export const diagnosisNames = (data) => {
    return {
        type: actionType.DIAGNOSIS_NAME,
        payload: data
    }
}
