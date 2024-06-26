const express = require('express')
const router = express.Router()

//import routers
const { company_medicine_name, company_medicines, company_medicine_search } = require('../../Controlers/company_Controller/company_medicine_name')
const { registration, checkUser, companyupdateinfo } = require('../../Controlers/company_Controller/company_registration')
const { signin, recoverAccount, changePassword } = require('../../Controlers/company_Controller/company_signin')
const { getDrugData ,updateDrugData} = require('../../Controlers/company_Controller/drugUpdate')
const { verifyToken } = require('../../middileware/verifyToken')

//Routers
router.post('/registration', registration)
router.post('/checkUser', checkUser)
router.post('/signin', signin)
router.post('/recoverAccount', recoverAccount)
router.post('/changePassword', changePassword)
router.post('/company_medicine_name', verifyToken, company_medicine_name)
router.get('/company_medicines', verifyToken, company_medicines)
router.get('/company_medicine_search', verifyToken, company_medicine_search)
router.get('/getDrugData', verifyToken, getDrugData)
router.post('/updateDrugData', verifyToken, updateDrugData)
router.post('/companyupdateinfo', verifyToken, companyupdateinfo)

module.exports = router