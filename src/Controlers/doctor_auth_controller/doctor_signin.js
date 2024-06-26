const Doctor = require('../../models/doctor_model/doctor_model')

exports.signin = async (req, res) => {
    const {
        hc_doctor_email,
        hc_doctor_phoneno,
        hc_doctor_password
    } = req.body

    try {
        if (hc_doctor_phoneno || hc_doctor_email) {
            const doctorExist = await Doctor.findOne({
                $and: [{
                    $or: [{
                        hc_doctor_email: hc_doctor_email
                    }, {
                        hc_doctor_phoneno: hc_doctor_phoneno
                    }]
                } ]
            })
            if(doctorExist=== null){
                return res.status(400).json({ message: "Invalid Action!!!" })
            }else{
                const checkpass = await doctorExist.authenticate(hc_doctor_password)
                if(checkpass){
                    const token = await doctorExist.generateToken()
                        return res.status(200).json({
                            token: token,
                            message: "Login Succesfull!!!"
                        })
                }else{
                    return res.status(400).json({ message: "Invalid Action!!!" })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            meassage: error
        })
    }
}

exports.recoverAccount = async (req, res) => {
    const { hc_doctor_phoneno, hc_doctor_email } = req.body
    try {
        if (hc_doctor_phoneno || hc_doctor_email) {
            const doctorExist = await Doctor.findOne({
                $and: [{
                    $or: [{
                        hc_doctor_email: hc_doctor_email
                    }, {
                        hc_doctor_phoneno: hc_doctor_phoneno
                    }]
                } ]
            }).select({ hc_doctor_phoneno: 1 })
            return res.status(200).json(doctorExist)
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
    const doctorExist = await Doctor.findById(id)
    const feedback = await doctorExist.changePassword(newPassword)
    return res.status(201).json(feedback)
}