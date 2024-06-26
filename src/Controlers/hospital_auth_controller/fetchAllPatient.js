const Patient = require('../../models/patient_model/patient_model')

exports.fetchAllPatient = async (req, res) => {
    if (req.user.role === "Hospital" || req.user.role==="Doctor") {
        try {
            const patient = await Patient.find()
            .skip(req.headers.skip).limit(10)
            .select({
                "hc_patient_avatar": 1,
                "hc_patient_firstName": 1,
                "hc_patient_lastName": 1,
                "hc_patient_sex": 1,
                "hc_patient_marital_status": 1,
                "hc_patient_date_of_birth": 1,
                "hc_patient_bloodGroup": 1,
                "hc_patient_occupation": 1,
                "hc_patient_address": 1,
                "hc_patient_phoneno": 1,
            })
            return res.status(200).json(patient)
        } catch (error) {
            return res.status(500).json(error)
        }

    } else {
        return res.status(400).json({measge:"Not a valid User!!!"})
    }
}

exports.deletePatient = async (req, res) => {

    try{
        const deletePatientAC = await Patient.findOne({
            _id: req.headers.patientid
        })
        if(deletePatientAC){
            const dltAC = await Patient.deleteOne({
                _id: req.headers.patientid
            })
            dltAC.deletedCount == '1'? res.status(200).json(dltAC) : res.status(400).json(dltAC)
        }else{
            return res.status(500).json({message:"User Not Exist!!!"})
        }
    }catch(error){
        console.log(error);
    }
}