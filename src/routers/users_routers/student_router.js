const express = require('express')
const router = express.Router()

//import routers
const { registration, checkUser } = require('../../Controlers/med_std_Controller/med_std_registration')
const { signin, recoverAccount, changePassword } = require('../../Controlers/med_std_Controller/med_std_signin')
const { updateStudentProfile } = require('../../Controlers/med_std_Controller/updateStudentProfile')
const { student_prescription } = require('../../Controlers/prescription_controller/studentPrescriptionWriten')
const { verifyToken } = require('../../middileware/verifyToken')
const { Student_prescription_Data, patientPrescriptionForStudent } = require('../../Controlers/prescription_controller/Patient_prescription_Data')

//Routers
router.post('/registration', verifyToken, registration)
router.post('/checkUser', checkUser)
router.post('/signin', signin)
router.post('/recoverAccount', recoverAccount)
router.post('/changePassword', changePassword)
router.post('/updateStudentProfile', verifyToken, updateStudentProfile)
router.post('/student_prescription', verifyToken, student_prescription)
router.get('/student_prescription_Data', verifyToken, Student_prescription_Data)
router.get('/patientPrescriptionForStudent', verifyToken, patientPrescriptionForStudent)

module.exports = router