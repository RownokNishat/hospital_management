const express = require('express')
const router = express.Router()


//import routers
const { verifyToken } = require('../../middileware/verifyToken')
const { dashboard } = require('../../Controlers/dashboard_controller/dashboard')


//Routers
router.get('/users', verifyToken, dashboard)


module.exports = router