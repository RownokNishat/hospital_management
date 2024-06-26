const Hospital = require('../../models/hospital_model/hospital_model')

exports.signin = async (req, res) => {
    const {
        hc_hospital_email,
        hc_hospital_phoneno,
        hc_hospital_password
    } = req.body

    try {
        if (hc_hospital_phoneno || hc_hospital_email) {
            const hospitalExist = await Hospital.findOne({
                $and: [{
                    $or: [{
                        hc_hospital_email: hc_hospital_email
                    }, {
                        hc_hospital_phoneno: hc_hospital_phoneno
                    }]
                }, ]
            })
            if(hospitalExist=== null){
                return res.status(400).json({ message: "Invalid Action!!!" })
            }else{
                const checkpass = await hospitalExist.authenticate(hc_hospital_password)
                if(checkpass){
                    const token = await hospitalExist.generateToken()
                        return res.status(200).json({
                            token: token,
                            message: "Login Succesfull!!!"
                        })
                }else{
                    return res.status(400).json({ message: "Invalid Action!!!" })
                }
            }
        }else{
            return res.status(400).json({ message: "Invalid Action!!!" })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

exports.recoverAccount = async (req, res) => {
    const { hc_hospital_phoneno , hc_hospital_email } = req.body
    try {
        if (hc_hospital_phoneno || hc_hospital_email) {
            const hospitalExist = await Hospital.findOne({
                $and: [{
                    $or: [{
                        hc_hospital_phoneno: hc_hospital_phoneno
                    }, {
                        hc_hospital_email: hc_hospital_email
                    }]
                } ]
            }).select({ hc_hospital_phoneno: 1 })
            return res.status(200).json(hospitalExist)
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
    const hospitalExist = await Hospital.findById(id)
    const feedback = await hospitalExist.changePassword(newPassword)
    return res.status(201).json(feedback)
}