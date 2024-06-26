const Prescription = require('../../models/prescription_model/prescription_model')
const Med_Std_Prescription = require('../../models/prescription_model/med_std_prescription_model')

exports.Patient_prescription_Data = async (req, res) => {
    const populateChamber = {
        path: 'chamber',
        select: ['_id', 'hc_hospital_english_name', 'hc_hospital_address', 'hc_hospital_logo']
    }
    const populatePatient = {
        path: 'patientId',
        select: ['_id', 'hc_patient_firstName', 'hc_patient_lastName', 'hc_patient_date_of_birth', 'hc_patient_sex']
    }
    const populateDoctor = {
        path: 'doctorId',
        select: ["_id", "hc_doctor_banglaName", "hc_doctor_englishName", "hc_doctor_phoneno", "hc_doctor_email", "hc_doctor_consultant", "hc_doctor_serial_no", "hc_doctor_specialist", "hc_doctor_course_done", "hc_doctor_BMDC_reg_no", "hc_doctor_FELLOW_id","hc_doctor_job_title", "hc_doctor_medicale_name", "hc_doctor_education"]
    }
    const { patientid } = req.headers
    try {
        const _prescription = await Prescription.findById(patientid)
            .populate(populateChamber)
            .populate(populatePatient)
            .populate(populateDoctor)
        return res.status(200).json(_prescription);
    } catch (error) {
        return res.status(500).json(error)
    }
}

//  Student Prescription View
exports.Student_prescription_Data = async (req, res) => {
    const populateChamber = {
        path: 'studentId',
        select: ['hc_student_englishName', 'hc_student_education', 'hc_student_BMDC_reg_no', 'hc_student_phoneno', 'hc_student_session'],
        populate: {
            path: 'hc_hospitalID',
            select: ['hc_hospital_logo', 'hc_hospital_english_name', 'hc_hospital_address']
        }
    }
    const { studentprescriptionid } = req.headers
    try {
        const _student_prescription = await Med_Std_Prescription.findById(studentprescriptionid)
            .populate(populateChamber)

        return res.status(200).json(_student_prescription);
    } catch (error) {
        return res.status(500).json(error)
    }
}


//  Patient Prescription list for Student
exports.patientPrescriptionForStudent = async (req, res) => {
    const populateDoctor = {
        path: 'doctorId',
        select: ["hc_doctor_englishName","hc_doctor_avatar"]
    }
    const skip = req.headers
    try {
        const _prescription = await Prescription.find()
            .select({ "Diagnosis": 1 })
            .populate(populateDoctor)
            .skip(skip).limit(50)

        return res.status(200).json(_prescription);
    } catch (error) {
        return res.status(500).json(error)
    }
}