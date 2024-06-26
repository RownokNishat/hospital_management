const Doctor = require('../../models/doctor_model/doctor_model')
const Prescription = require('../../models/prescription_model/prescription_model')

exports.updateDoctorHospitalProfile = async (req, res) => {
    const { hc_doctor_fees, hc_doctor_of_hospital } = req.body
    try {
        const _doctor = await Doctor.updateOne(
            {
                _id: req.user._id,
                "hc_doctor_of_hospital.hospitalID": hc_doctor_of_hospital.hospitalID
            },
            {
                $set: {
                    'hc_doctor_fees': hc_doctor_fees,
                    'hc_doctor_of_hospital.$.notAvailableDays': hc_doctor_of_hospital.notAvailableDays,
                    'hc_doctor_of_hospital.$.dayTimeSlot': hc_doctor_of_hospital.dayTimeSlot,
                    'hc_doctor_of_hospital.$.nightTimeSlot': hc_doctor_of_hospital.nightTimeSlot,
                    'hc_doctor_of_hospital.$.appointment_duration': hc_doctor_of_hospital.appointment_duration,
                    'hc_doctor_of_hospital.$.update': true,
                }
            }
        )
        if (_doctor.acknowledged) {
            res.status(203).json({ message: "Update Successfull!!!" })
        } else {
            res.status(500).json({ message: "Please Try Again" })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateDoctorProfileInfo = async (req, res) => {
    const {
        hc_doctor_banglaName,
        hc_doctor_englishName,
        hc_doctor_address,
        hc_doctor_serial_no,
        hc_doctor_medicale_name,
        hc_doctor_education,
        hc_doctor_course_done,
        hc_doctor_consultant,
        hc_doctor_specialist,
        hc_doctor_avatar,
        hc_doctor_sex,
        hc_doctor_date_of_birth,
        hc_doctor_bloodGroup,
        hc_doctor_job_title,
        hc_doctor_relegion,
    } = req.body
    try {
        const _doctor = await Doctor.updateOne(
            {
                _id: req.user._id
            },
            {
                $set: {
                    'hc_doctor_banglaName': hc_doctor_banglaName,
                    'hc_doctor_englishName': hc_doctor_englishName,
                    'hc_doctor_address': hc_doctor_address,
                    'hc_doctor_serial_no': hc_doctor_serial_no,
                    'hc_doctor_medicale_name': hc_doctor_medicale_name,
                    'hc_doctor_education': hc_doctor_education,
                    'hc_doctor_course_done': hc_doctor_course_done,
                    'hc_doctor_consultant': hc_doctor_consultant,
                    'hc_doctor_specialist': hc_doctor_specialist,
                    'hc_doctor_avatar': hc_doctor_avatar,
                    'hc_doctor_sex': hc_doctor_sex,
                    "hc_doctor_date_of_birth": hc_doctor_date_of_birth,
                    "hc_doctor_bloodGroup": hc_doctor_bloodGroup,
                    "hc_doctor_relegion": hc_doctor_relegion,
                    "hc_doctor_job_title": hc_doctor_job_title
                }
            }
        )
        if (_doctor.acknowledged) {
            res.status(203).json({ message: "Update Successfull!!!" })
        } else {
            res.status(500).json({ message: "Please Try Again" })
        }
    } catch (error) {
        console.log(error);
    }
}


exports.DoctorprescriptionNote = async (req, res) => {
    const { prescriptionID, note } = req.body
    const _prescription = await Prescription.updateOne(
        {
            _id: prescriptionID
        },
        {
            $set: {
                'Note': note,
            }
        }
    )
    if (_prescription.acknowledged) {
        res.status(203).json({ message: "Update Successfull!!!" })
    } else {
        res.status(500).json({ message: "Please Try Again" })
    }
}