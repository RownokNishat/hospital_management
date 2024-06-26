const Patient = require('../../models/patient_model/patient_model')

exports.registration = async (req, res) => {
    const {
        hc_patient_firstName,
        hc_patient_lastName,
        hc_patient_occupation,
        hc_patient_phoneno,
        hc_patient_sex,
        hc_patient_bloodGroup,
        hc_patient_avatar,
        hc_patient_relegion,
        hc_patient_date_of_birth,
        hc_patient_password,
        hc_patient_address,
        hc_patient_marital_status,
    } = req.body


    try {
        const patientExist = await Patient.findOne({ hc_patient_phoneno: hc_patient_phoneno })
        if (patientExist != null) {
            return res.status(422).json({
                message: "Patient Already Exist!!!"
            })
        } else {
            const _patient = new Patient({
                hc_patient_firstName,
                hc_patient_lastName,
                hc_patient_occupation,
                hc_patient_phoneno,
                hc_patient_bloodGroup,
                hc_patient_sex,
                hc_patient_avatar,
                hc_patient_relegion,
                hc_patient_date_of_birth,
                hc_patient_password,
                hc_patient_address,
                hc_patient_marital_status,
            })
            await _patient.save()
            return res.status(201).json({
                message: "Patient Registretion Successfull!!!"
            })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.checkUser = async (req, res) => {
    const { hc_patient_phoneno } = req.body
    const patientExist = await Patient.findOne({ hc_patient_phoneno: hc_patient_phoneno })

    if (patientExist != null) {
        const error = new Error({ message: "Patient Already Exist!!!" });
        return res.status(500).json(error)
    } else {
        return res.status(200).json({ message: "Can Register" })
    }

}