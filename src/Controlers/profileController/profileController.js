const Patient = require('../../models/patient_model/patient_model')
const Doctor = require('../../models/doctor_model/doctor_model')
const Hospital = require('../../models/hospital_model/hospital_model')
const Student = require('../../models/Student_Model/student_model')
const Company = require('../../models/Company Model/company_model')

const doctor = async (_id, res) => {
    const populateQuery = {
        path: 'hc_doctor_of_hospital.hospitalID',
        select: ['hc_hospital_english_name', 'hc_hospital_logo']
    }
    const populatePrescriptionDiagnosis = {
        path: 'hc_doctor_write_prescription.prescriptionID',
        select: ['Diagnosis', 'Note','createdAt'],
        populate: [{
            path: 'patientId',
            select: ['hc_patient_firstName', 'hc_patient_lastName']
        }]
    }
    const populateQueryNotificationDoctor = {
        path: 'hc_doctor_notifications.notificationID',
        populate: [{
            path: 'hospitalID',
            select: ['hc_hospital_english_name', 'hc_hospital_logo']
        }, {
            path: 'appointmentID',
            select: ['visitingSlot', 'serialNo', 'hc_appoinmentDate','approved']
        }, {
            path: 'patientID',
            select: ['hc_patient_firstName', 'hc_patient_lastName', 'hc_patient_avatar','hc_patient_sex'],
        }]
    }
    try {
        const doctor = await Doctor.findById(_id).select({
            "hc_doctor_avatar": 1,
            "hc_doctor_englishName": 1,
            "hc_doctor_banglaName": 1,
            "hc_doctor_sex": 1,
            "hc_doctor_BMDC_reg_no": 1,
            "hc_doctor_education": 1,
            "hc_doctor_course_done": 1,
            "hc_doctor_consultant": 1,
            "hc_doctor_email": 1,
            "hc_doctor_address": 1,
            "hc_doctor_job_title": 1,
            "hc_doctor_date_of_birth": 1,
            "hc_doctor_bloodGroup": 1,
            "hc_doctor_relegion": 1,
            "hc_doctor_phoneno": 1,
            "hc_doctor_FELLOW_id": 1,
            "hc_doctor_specialist": 1,
            "hc_doctor_medicale_name": 1,
            "hc_doctor_serial_no": 1,
            "hc_doctor_of_hospital": 1,
            "hc_doctor_fees": 1,
        })
            .populate(populateQuery)
            .populate(populatePrescriptionDiagnosis)
            .populate(populateQueryNotificationDoctor)

        return res.status(200).json({
            doctor
        })
    } catch (error) {
        return res.status(500).json({
            error: "Someting went wrong!!!"
        })
    }
}
const patient = async (_id, res) => {
    const populateQuery = {
        path: 'hc_patient_prescription.prescriptionID',
        select: ['Diagnosis', 'Review', 'createdAt'],
        populate: {
            path: 'doctorId',
            select: ['hc_doctor_englishName', 'hc_doctor_avatar'],
        }
    }
    const populateQueryDiagnosisTestReport = {
        path: 'hc_patient_testReport.testReport',
        select: ['testName', 'webViewLink', 'createdAt'],
        populate: {
            path: 'hospitalID',
            select: ['hc_hospital_english_name', 'hc_hospital_logo'],
        }
    }

    const populateQueryNotification = {
        path: 'hc_patient_notifications.notificationID',
        populate: [{
            path: 'doctorID',
            select: ['hc_doctor_englishName', 'hc_doctor_avatar'],
        }, {
            path: 'hospitalID',
            select: ["hc_hospital_english_name", "hc_hospital_logo"]
        }, {
            path: 'testReport',
            select: ["testName", "webViewLink"]
        }]
    }
    try {
        const patient = await Patient.findById(_id).select({
            "hc_patient_avatar": 1,
            "hc_patient_firstName": 1,
            "hc_patient_lastName": 1,
            "hc_patient_email": 1,
            "hc_patient_sex": 1,
            "hc_patient_relegion": 1,
            "hc_patient_marital_status": 1,
            "hc_patient_date_of_birth": 1,
            "hc_patient_bloodGroup": 1,
            "hc_patient_occupation": 1,
            "hc_patient_address": 1,
            "hc_patient_phoneno": 1,
        })
            .populate(populateQuery)
            .populate(populateQueryDiagnosisTestReport)
            .populate(populateQueryNotification)
        return res.status(200).json({
            patient
        })
    } catch (error) {
        return res.status(500).json({
            error: "Someting went wrong!!!"
        })
    }
}
const hospital = async (_id, res) => {
    const populateQueryNotificationHospital = {
        path: 'hc_hospital_notifications.notificationID',
        // select: ['doctorID', 'appointmentID', 'patientID'],
        populate: [{
            path: 'doctorID',
            select: ['hc_doctor_englishName', 'hc_doctor_avatar']
        }, {
            path: 'appointmentID',
            select: ['visitingSlot', 'serialNo', 'hc_appoinmentDate','approved']
        }, {
            path: 'patientID',
            select: ['hc_patient_firstName', 'hc_patient_lastName', 'hc_patient_avatar'],
        }]
    }
    try {
        const hospital = await Hospital.findById(_id).select({
            "hc_hospital_english_name": 1,
            "hc_hospital_DGHS_reg_no": 1,
            "hc_hospital_DGHS_reg_no": 1,
            "hc_hospital_address": 1,
            "hc_hospital_phoneno": 1,
            "hc_hospital_logo": 1,
            "hc_hospital_diagnosis_test_details": 1,
        })
            .populate(populateQueryNotificationHospital)
        return res.status(200).json({
            hospital
        })
    } catch (error) {
        return res.status(500).json({
            error: "Someting went wrong!!!"
        })
    }
}
const student = async (_id, res) => {
    const populateHospitl = {
        path: 'hc_hospitalID',
        select: ['hc_hospital_english_name', 'hc_hospital_logo']
    }
    const populateQuery = {
        path: 'hc_student_write_prescription.prescriptionID',
        select: ['Diagnosis', 'createdAt',]
    }
    try {
        const _student = await Student.findById(_id).select({
            "hc_student_address": 1,
            "hc_student_englishName": 1,
            "hc_student_date_of_birth": 1,
            "hc_student_BMDC_reg_no": 1,
            "hc_student_session": 1,
            "hc_student_sex": 1,
            "hc_student_avatar": 1,
            "hc_student_phoneno": 1,
            "hc_student_education": 1
        })
            .populate(populateHospitl)
            .populate(populateQuery)
        return res.status(200).json({
            _student
        })
    } catch (error) {
        return res.status(500).json({
            error: "Someting went wrong!!!"
        })
    }
}

const company = async (_id, res) => {
    try {
        const _company = await Company.findById(_id).select({
            "hc_company_englishName": 1,
            "hc_company_email": 1,
            "hc_company_phoneno": 1,
            "hc_company_avatar": 1,
            "hc_company_reg_no": 1,
        })
        return res.status(200).json({
            _company
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getProfileDetails = async (req, res) => {
    const {
        role,
        _id
    } = req.user

    const {
        patientId
    } = req.params


    if (patientId) {
        patient(patientId, res)
    } else {
        switch (role) {
            case "Doctor":
                doctor(_id, res)
                break
            case "Patient":
                patient(_id, res)
                break
            case "Hospital":
                hospital(_id, res)
                break
            case "Student":
                student(_id, res)
                break
            case "Company":
                company(_id, res)
                break

            default:
                null
        }
    }
}