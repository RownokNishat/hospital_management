const express = require('express')
const router = express.Router()

const { verifyToken } = require('../middileware/verifyToken')


router.get('/', (req, res, next)=>{
    return res.status(200).json("Runnig")
})


router.get('/test',verifyToken, (req, res, next)=>{
    return res.status(200).json({
        data:req.user,
    })
})

module.exports = router