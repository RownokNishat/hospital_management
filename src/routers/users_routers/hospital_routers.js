const express = require('express')
const router = express.Router()

//import routers
const { registration, hospital_logo, checkUser } = require('../../Controlers/hospital_auth_controller/hospital_registration')
const { signin, recoverAccount, changePassword } = require('../../Controlers/hospital_auth_controller/hospital_signin')
const { filterHospitalDoctors, hospitalDiagnosis, hospitalWiseDoctor } = require('../../Controlers/hospital_auth_controller/filterHospitalDoctors')
const { deleteDoctorAC } = require('../../Controlers/hospital_auth_controller/deleteDoctorAC')
const { verifyToken } = require('../../middileware/verifyToken')
const { fetchAllPatient, deletePatient } = require('../../Controlers/hospital_auth_controller/fetchAllPatient')
const { doctorsSpecialist } = require('../../Controlers/doctor_auth_controller/doctor_by_specialist')
const { getSpecialistDoctor } = require('../../Controlers/doctor_auth_controller/get_filter_doctor')
const { landing_page_hospitals } = require('../../Controlers/hospital_auth_controller/landing_page_hospital')
const { updateHospitalProfileInfo } = require('../../Controlers/hospital_auth_controller/updateHospitalProfileInfo')

//Routers
router.post('/registration', registration)
router.post('/checkUser', checkUser)
router.post('/hospital_logo', verifyToken, hospital_logo)
router.post('/signin', signin)
router.post('/recoverAccount', recoverAccount)
router.post('/changePassword', changePassword)
router.get('/updateHospitalProfileInfo', verifyToken, updateHospitalProfileInfo) //updateProfile
router.get('/filterHospitalDoctors', verifyToken, filterHospitalDoctors)
router.post('/hospitalDiagnosis', verifyToken, hospitalDiagnosis)
router.get('/deleteDoctorAC', verifyToken, deleteDoctorAC)
router.get('/fetchAllPatient', verifyToken, fetchAllPatient)
router.get('/deletePatient', verifyToken, deletePatient)
router.get('/filterSpecialist', doctorsSpecialist)
router.post('/getfilterSpecialist', getSpecialistDoctor)
router.get('/landingPageHospitals', landing_page_hospitals)
router.post('/hospitalWiseDoctor', hospitalWiseDoctor)
module.exports = router