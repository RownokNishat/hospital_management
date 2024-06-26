const Student = require('../../models/Student_Model/student_model')

exports.signin = async (req, res) => {
    const {
        hc_student_email,
        hc_student_phoneno,
        hc_student_password
    } = req.body

    try {
        if (hc_student_email || hc_student_phoneno) {
            const studentExist = await Student.findOne({
                $and: [{
                    $or: [{
                        hc_student_email: hc_student_email
                    }, {
                        hc_student_phoneno: hc_student_phoneno
                    }]
                }]
            })

            if (studentExist === null) {
                return res.status(400).json({ message: "Invalid Action!!!" })
            } else {
                const checkpass = await studentExist.authenticate(hc_student_password)
                if (checkpass) {
                    const token = await studentExist.generateToken()
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
    const { hc_student_phoneno , hc_student_email } = req.body
    try {
        if (hc_student_phoneno || hc_student_email) {
            const studentExist = await Student.findOne({
                $and: [{
                    $or: [{
                        hc_student_phoneno: hc_student_phoneno
                    }, {
                        hc_student_email: hc_student_email
                    }]
                } ]
            }).select({ hc_student_phoneno: 1 })
            return res.status(200).json(studentExist)
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
    const studentExist = await Student.findById(id)
    const feedback = await studentExist.changePassword(newPassword)
    return res.status(201).json(feedback)
}