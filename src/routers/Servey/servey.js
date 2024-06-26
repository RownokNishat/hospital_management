const express = require('express')
const router = express.Router()


//import routers
const { verifyToken } = require('../../middileware/verifyToken')
const { serveyDoctor, serveyHospital, location } = require('../../Controlers/servey_controller/servey')

//Routers
router.post('/serveyDoctor', verifyToken, serveyDoctor)
router.post('/serveyHospital', verifyToken, serveyHospital)
router.get('/serveyonLocation', verifyToken, location)


module.exports = router