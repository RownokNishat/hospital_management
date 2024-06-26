const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer();

//import routers
const { avaterUpload } = require('../../Controlers/file_Upload/avaterUpload')
const { upload_test_report_pdf } = require('../../Controlers/file_Upload/upload_test_report_pdf')
const { verifyToken } = require('../../middileware/verifyToken')

//Routers
router.post('/avaterUpload/:user', verifyToken, avaterUpload)
router.post('/testReportUpload',verifyToken, upload_test_report_pdf)


module.exports = router