const express = require('express')
const router = express.Router()

//import routers
const { verifyToken } = require('../../middileware/verifyToken')
const {getProfileDetails} = require('../../Controlers/profileController/profileController')

//Routers
router.get('/:patientId',verifyToken, getProfileDetails)
router.get('/',verifyToken, getProfileDetails)

module.exports = router