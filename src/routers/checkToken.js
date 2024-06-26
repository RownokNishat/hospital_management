const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


router.get('/token', (req, res)=>{
    const {authorization} = req.headers
    try {
        if (authorization) {
            const token = authorization.split(" ")[1];
            const check = jwt.verify(token, process.env.SECRECT_KEY)
            req.user = check
            return res.send(check)
        } else {
            return res.status(404).json({
                message: "Not A Valid Request"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Session out. Please Login again."
        })
    }
})


module.exports = router