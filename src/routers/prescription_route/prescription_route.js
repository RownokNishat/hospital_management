const express = require('express')
const router = express.Router()

//import routers
const {
    drug_control,
    drug_type_controler,
    search_drug,
    drug_types,
    drug_control_with_csv
} = require('../../Controlers/drug_controller/drug_control')

const {investigation_control_with_csv ,search_investigation}= require('../../Controlers/drug_controller/investigation_control')

const {search_diagnosis, diagnosis_Advices }=require('../../Controlers/advice_Controller/search_diagnosis')

// const {advice_control_with_csv} = require('../../Controlers/advice_Controller/advice_List_control')
// const {diagnosis_advice_control_json} = require('../../Controlers/advice_Controller/adviceDiagnosis_controler')

const {
    verifyToken
} = require('../../middileware/verifyToken')


//Routers
// router.post('/drug_control_with_csv', verifyToken, drug_control_with_csv)
// router.post('/drug_control', verifyToken, drug_control)
router.post('/search_drug', verifyToken, search_drug)

// router.post('/drug_type', verifyToken, drug_type_controler)
router.get('/drug_type', drug_types)


// router.post('/investigation_control_with_csv', verifyToken, investigation_control_with_csv)
router.post('/search_investigation', verifyToken, search_investigation)

// Add Advice tp mongoDB
// router.post('/adviceList', verifyToken, advice_control_with_csv)
// router.post('/diagnosis_advice_control_json', verifyToken, diagnosis_advice_control_json)
router.post('/search_diagnosis', verifyToken, search_diagnosis)

// Search Advice
router.post('/diagnosis_Advices',  diagnosis_Advices)

module.exports = router