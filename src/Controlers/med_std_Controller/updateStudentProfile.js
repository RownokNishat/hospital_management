const Student = require('../../models/Student_Model/student_model')

exports.updateStudentProfile = async (req, res) => {
    const {
        hc_student_englishName,
        hc_student_sex,
        hc_student_address,
        hc_student_education
    } = req.body
    try {
        const _student = await Student.updateOne(
            {
                _id: req.user._id
            },
            {
                $set: {
                    'hc_student_englishName': hc_student_englishName,
                    'hc_student_sex': hc_student_sex,
                    'hc_student_education': hc_student_education,
                    'hc_student_address': hc_student_address
                }
            }
        )
        if (_student.acknowledged) {
            res.status(203).json({ message: "Update Successfull!!!" })
        } else {
            res.status(500).json({ message: "Please Try Again" })
        }
    } catch (error) {
        console.log(error);
    }
}