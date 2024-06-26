const Doctor = require('../../models/doctor_model/doctor_model')

const newDoctor = async (
    hc_doctor_banglaName,
    hc_doctor_englishName,
    hc_doctor_email,
    hc_doctor_phoneno,
    hc_doctor_NID,
    hc_doctor_sex,
    hc_doctor_nid_pic,
    hc_doctor_avatar,
    hc_doctor_specialist,
    hc_doctor_relegion,
    hc_doctor_date_of_birth,
    hc_doctor_password,
    hc_doctor_address,
    hc_doctor_BMDC_reg_no,
    hc_doctor_FELLOW_id,
    hc_doctor_medicale_name,
    hc_doctor_education,
    hc_doctor_course_done,
    hc_doctor_consultant,
    hc_doctor_serial_no,
    hc_doctor_of_hospital,
    hc_doctor_bloodGroup,
    hc_doctor_job_title,
    req, res
) => {

    const _doctor = new Doctor({
        hc_doctor_banglaName,
        hc_doctor_englishName,
        hc_doctor_email,
        hc_doctor_phoneno,
        hc_doctor_NID,
        hc_doctor_sex,
        hc_doctor_nid_pic,
        hc_doctor_avatar,
        hc_doctor_specialist,
        hc_doctor_relegion,
        hc_doctor_date_of_birth,
        hc_doctor_password,
        hc_doctor_address,
        hc_doctor_BMDC_reg_no,
        hc_doctor_FELLOW_id,
        hc_doctor_medicale_name,
        hc_doctor_education,
        hc_doctor_course_done,
        hc_doctor_consultant,
        hc_doctor_serial_no,
        hc_doctor_of_hospital,
        hc_doctor_job_title,
        hc_doctor_bloodGroup
    })
    await _doctor.save()
    const doctors = await Doctor.find({
        hc_doctor_of_hospital: { $all: [{ $elemMatch: { qty: 5, hospitalID: req.user._id } }] }
    }).select({
        "_id": 1,
        "hc_doctor_avatar": 1,
        "hc_doctor_englishName": 1,
        "hc_doctor_sex": 1,
        "hc_doctor_phoneno": 1,
        "hc_doctor_date_of_birth": 1,
        "hc_doctor_education": 1,
        "hc_doctor_address": 1,
    })
    return res.status(201).json(doctors)
}

exports.registration = async (req, res) => {

    if (req.user.role === "Hospital") {
        const hc_doctor_of_hospital = [{
            hospitalID: `${req.user._id}`,
            notAvailableDays: req.body.notAvailableDays
        }]
        const {
            hc_doctor_banglaName,
            hc_doctor_englishName,
            hc_doctor_email,
            hc_doctor_phoneno,
            hc_doctor_NID,
            hc_doctor_sex,
            hc_doctor_nid_pic,
            hc_doctor_avatar,
            hc_doctor_relegion,
            hc_doctor_date_of_birth,
            hc_doctor_password,
            hc_doctor_address,
            hc_doctor_BMDC_reg_no,
            hc_doctor_FELLOW_id,
            hc_doctor_serial_no,
            hc_doctor_specialist,
            hc_doctor_medicale_name,
            hc_doctor_course_done,
            hc_doctor_consultant,
            hc_doctor_education,
            hc_doctor_job_title,
            hc_doctor_bloodGroup
        } = req.body

        try {
            const doctorExist = await Doctor.find({
                $and: [{
                    $or: [{
                        hc_doctor_phoneno: hc_doctor_phoneno
                    }, {
                        hc_doctor_email: hc_doctor_email
                    }]
                },]
            })
                .select({
                    "_id": 1,
                    "hc_doctor_englishName": 1,
                    "hc_doctor_phoneno": 1,
                    "hc_doctor_email": 1,
                    "hc_doctor_avatar": 1,
                    "hc_doctor_specialist": 1,
                    "hc_doctor_BMDC_reg_no": 1,
                    "hc_doctor_medicale_name": 1,
                    "hc_doctor_of_hospital": 1,
                })

            if (doctorExist.length == 0) {
                !hc_doctor_banglaName || !hc_doctor_email || !hc_doctor_phoneno || !hc_doctor_date_of_birth || !hc_doctor_BMDC_reg_no || !hc_doctor_englishName || !hc_doctor_NID  || !hc_doctor_relegion ? res.status(203).json({ message: "empty" }) :
                    newDoctor(
                        hc_doctor_banglaName,
                        hc_doctor_englishName,
                        hc_doctor_email,
                        hc_doctor_phoneno,
                        hc_doctor_NID,
                        hc_doctor_sex,
                        hc_doctor_nid_pic,
                        hc_doctor_avatar,
                        hc_doctor_specialist,
                        hc_doctor_relegion,
                        hc_doctor_date_of_birth,
                        hc_doctor_password,
                        hc_doctor_address,
                        hc_doctor_BMDC_reg_no,
                        hc_doctor_FELLOW_id,
                        hc_doctor_medicale_name,
                        hc_doctor_education,
                        hc_doctor_course_done,
                        hc_doctor_consultant,
                        hc_doctor_serial_no,
                        hc_doctor_of_hospital,
                        hc_doctor_job_title,
                        hc_doctor_bloodGroup,
                        req, res
                    )
            } else {
                return res.status(200).json({
                    message: doctorExist
                })
            }
        } catch (error) {
            return res.status(500).json({
                messgae: error
            })
        }
    } else {
        return res.status(404).json({ message: "Invalid Action" })
    }
}

// Add Doctor to Hospital

exports.addExistDoctorToHospital = async (req, res) => {
    if (req.user.role === "Hospital") {
        const { doctorId } = req.body
        const hc_doctor_of_hospital = {
            hospitalID: `${req.user._id}`,
        }
        const doctorExist = await Doctor.findById(doctorId)
        await doctorExist.add_hc_doctor_of_hospital(hc_doctor_of_hospital)
        return res.status(201).json({ message: "Doctor Added to Hospital Successfully !!!" })
    } else {
        return res.status(404).json({ message: "Invalid Action" })
    }
}