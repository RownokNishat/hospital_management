const Patient = require('../../models/patient_model/patient_model')

exports.signin = async (req, res) => {
    const {
        hc_patient_email,
        hc_patient_phoneno,
        hc_patient_password
    } = req.body

    try {
        if (hc_patient_email || hc_patient_phoneno) {
            const patientExist = await Patient.findOne({ hc_patient_phoneno: hc_patient_phoneno })

            if (patientExist === null) {
                return res.status(400).json({ message: "Invalid Action!!!" })
            } else {
                const checkpass = await patientExist.authenticate(hc_patient_password)
                if (checkpass) {
                    const token = await patientExist.generateToken()
                    return res.status(200).json({
                        token: token,
                        message: "Login Succesfull!!!"
                    })
                } else {
                    return res.status(400).json({ message: "Invalid Action!!!" })
                }
            }
        } else {
            return res.status(400).json({ message: "Invalid Action!!!" })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
exports.recoverAccount = async (req, res) => {
    const { hc_patient_phoneno } = req.body
    try {
        if (hc_patient_phoneno) {
            const patientExist = await Patient.findOne({ hc_patient_phoneno: hc_patient_phoneno }).select({ hc_patient_phoneno: 1 })
            return res.status(200).json(patientExist)
        } else {
            return res.status(400).json({ message: "Invalid Action!!!" })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

exports.changePassword = async (req, res) => {
    const { newPassword, id } = req.body
    const patientExist = await Patient.findById(id)
    const feedback = await patientExist.changePassword(newPassword)
    return res.status(201).json(feedback)
}