const Diagnosis_Advice = require('../../models/Advice_model/Diagnosis_Advice_UID')
const {adviceDiagnosis_UID}= require('./diagnosis_formate_with_UID')

exports.diagnosis_advice_control_json= async (req, res) => {
    if(req.user.role==="Hospital" || req.user.role==="Doctor"){
            try {
                adviceDiagnosis_UID.map(async (i) => {
                    const _advice = new Diagnosis_Advice(i);
                    const response =await _advice.save()
                    console.log(response);
                })
                return res.status(201).json({
                    message: adviceDiagnosis_UID.length
                })
            } catch (error) {
                return res.status(404).json({
                    message: "Invalid Action"
                })
            }
    }else{
        return res.status(500).json({
            message: "Invalid Action"
        })
    }
}
