const express = require('express')
const router = express.Router()

//import routers
const {
    registration,
    addExistDoctorToHospital
} = require('../../Controlers/doctor_auth_controller/doctor_registration')
const { signin, recoverAccount, changePassword } = require('../../Controlers/doctor_auth_controller/doctor_signin')
const { landing_page_doctor_controler } = require('../../Controlers/doctor_auth_controller/landing_page_doctor_controler')
const { doctorsinfo } = require('../../Controlers/doctor_auth_controller/doctorsinfo')
const { updateDoctorHospitalProfile, DoctorprescriptionNote, updateDoctorProfileInfo } = require('../../Controlers/doctor_auth_controller/update_Doctor_Profile')
const { verifyToken } = require('../../middileware/verifyToken')
const { doctor_hospital_controler } = require('../../Controlers/doctor_auth_controller/doctor_hospital_data')


//Routers
router.post('/registration', verifyToken, registration)
router.post('/addDoctorToHospital', verifyToken, addExistDoctorToHospital)
router.post('/recoverAccount', recoverAccount)
router.post('/changePassword', changePassword)
router.post('/signin', signin)
router.get('/landingPageDoctor', landing_page_doctor_controler)
router.get('/doctorsinfo', verifyToken, doctorsinfo)
router.post('/updateDoctorHospitalProfile', verifyToken, updateDoctorHospitalProfile)
router.post('/prescriptionNote', verifyToken, DoctorprescriptionNote)
router.post('/updateDoctorProfileInfo', verifyToken, updateDoctorProfileInfo)
router.post('/doctorHospitalData', verifyToken, doctor_hospital_controler)




module.exports = router