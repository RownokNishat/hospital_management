const express = require('express')
const router = express.Router()


//import routers
const { verifyToken } = require('../../middileware/verifyToken')
const { reqest_appointment } = require('../../Controlers/appointment_controller/reqest_appointment')
const { find_Appointment } = require('../../Controlers/appointment_controller/find_Appointment')
const { estimated_time } = require('../../Controlers/appointment_controller/estimated_time')
const { approve_Appointment, reject_Appointment, delete_Appointment } = require('../../Controlers/appointment_controller/approve_appointment_request')


//Routers
router.post('/request_appointment', verifyToken, reqest_appointment)
router.get('/estimated_time', verifyToken, estimated_time)
router.post('/doctors_appointment_list', verifyToken, find_Appointment)
router.put('/approve_Appointment', verifyToken, approve_Appointment)
router.put('/reject_Appointment', verifyToken, reject_Appointment)
router.delete('/delete_Appointment', verifyToken, delete_Appointment)


module.exports = router