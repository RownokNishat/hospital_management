const Student = require('../../models/Student_Model/student_model')
const Hospital = require('../../models/hospital_model/hospital_model')

exports.registration = async (req, res) => {
    const {
        hc_student_englishName,
        hc_student_email,
        hc_student_phoneno,
        hc_student_NID,
        hc_student_sex,
        hc_student_nid_pic,
        hc_student_avatar,
        hc_student_education,
        hc_student_relegion,
        hc_student_date_of_birth,
        hc_student_password,
        hc_student_address,
        hc_student_BMDC_reg_no,
        hc_student_session,
        hc_student_write_prescription
    } = req.body

    try {
        const _studentExist = await Student.findOne({
            $and: [{
                $or: [{
                    hc_student_email: hc_student_email
                }, {
                    hc_student_phoneno: hc_student_phoneno
                }]
            }]
        })
        if (_studentExist != null) {
            return res.status(422).json({
                message: "Student Already Exist!!!"
            })
        } else {
            const _student = new Student({
                hc_student_englishName,
                hc_student_email,
                hc_student_phoneno,
                hc_student_NID,
                hc_student_sex,
                hc_student_nid_pic,
                hc_student_avatar,
                hc_student_education,
                hc_student_relegion,
                hc_student_date_of_birth,
                hc_student_password,
                hc_student_address,
                hc_student_BMDC_reg_no,
                hc_student_session,
                hc_student_write_prescription,
                hc_hospitalID: req.user._id
            })
            const student = await _student.save()
            await Hospital.updateOne({ _id: req.user._id }, { $push: { hc_med_student: student._id } })
            return res.status(201).json({
                message: "Student Registretion Successfull!!!"
            })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}


exports.checkUser = async (req, res) => {
    const { hc_student_email, hc_student_phoneno } = req.body
 
    const studentExist = await Student.findOne({
        $and: [{
            $or: [{
                hc_student_email: hc_student_email
            }, {
                hc_student_phoneno: hc_student_phoneno
            }]
        }]
    })

    if (studentExist != null) {
        const error = new Error({ message: "Student Already Exist!!!" });
        return res.status(500).json(error)
    } else {
        return res.status(200).json({ message: "Can Register" })
    }
}