import * as actionTypes from './prescriptionActionType'
import Axios from 'axios'

const initialState = {
    prescriptionData:[],
    onLine: false,
    drugType:null,
    drugName:null,
    diagnosisName:null,
    diagnosisAdvice:[]
}

export const prescriptionData = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRESCRIPTION_DATA_QUEUE:
            let data= state.prescriptionData
            data.push(action.payload)
            window.alert("Prescription on a Queue")
            return {
                ...state,
                prescriptionData: data
            }

        case actionTypes.SYSTEM_ONLINE:
            return {
                ...state,
                onLine: action.payload
            }

        case actionTypes.DRUG_TYPE:
            return {
                ...state,
                drugType: action.payload
            }

        case actionTypes.DRUG_NAME:
            return {
                ...state,
                drugName: action.payload
            }
            
        case actionTypes.DIAGNOSIS_NAME:
            return {
                ...state,
                diagnosisName: action.payload
            }
            
        case actionTypes.PRESCRIPTION_DATA_PEEK_DEQUEUE:
            if(state.prescriptionData.length !=0){
                const pd=state.prescriptionData
                const shifted = pd.shift();
                const headers = action.payload
                headers.appointmentid = shifted.prescriptionHeader.appointmentid

                try{
                    Axios.post(`../api/patient/presentation`, shifted ,{headers})
                    .then((res) => {
                        if(res.status==201) {
                            window.alert("Prescription send successfully!!!")
                        }
                    })
                    .catch(error=>console.log(error))
                }catch(e){
                    console.log(e)
                }
            }
            
        default:
            return state
    }
}