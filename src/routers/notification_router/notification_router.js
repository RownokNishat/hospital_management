const express = require('express')
const router = express.Router()

const {showed_Notification }=require('../../Controlers/notification_controller/showedNotification')


const {
    verifyToken
} = require('../../middileware/verifyToken')

router.put('/showed_notification', verifyToken, showed_Notification )

module.exports = router