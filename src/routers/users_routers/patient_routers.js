const express = require('express')
const router = express.Router()

//import routers
const { registration, checkUser } = require('../../Controlers/patient_auth_controller/patient_registration')
const { signin, recoverAccount,changePassword } = require('../../Controlers/patient_auth_controller/patient_signin')
const { searchPatient } = require('../../Controlers/patient_auth_controller/searchPatient')
const { prescription,editPrescription } = require('../../Controlers/prescription_controller/prescription_controller')
const { updatePatientDetails,updatePatientPrescriptionReview } = require('../../Controlers/patient_auth_controller/updatePatientDetails')
const { Patient_prescription_Data } = require('../../Controlers/prescription_controller/Patient_prescription_Data')
const { verifyToken } = require('../../middileware/verifyToken')
const { Patient_notification_Data } = require('../../Controlers/notification_controller/patient_notification_Data')

//Routers
router.post('/registration', registration)
router.post('/checkUser', checkUser)
router.post('/signin', signin)
router.post('/recoverAccount', recoverAccount)
router.post('/changePassword', changePassword)
router.get('/searchPatient', verifyToken, searchPatient)
router.post('/presentation', verifyToken, prescription)
router.post('/editPresentation', verifyToken, editPrescription)
router.get('/patient_prescription_Data', verifyToken, Patient_prescription_Data)
// router.get('/patient_notification_Data', verifyToken, Patient_notification_Data)
router.post('/updatePatientDetails', verifyToken, updatePatientDetails)
router.post('/updatePatientPrescriptionReview', verifyToken, updatePatientPrescriptionReview)

module.exports = router