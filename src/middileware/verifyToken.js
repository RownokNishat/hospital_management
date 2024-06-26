const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    const {authorization} = req.headers
    try {
        if (authorization) {
            const token = authorization.split(" ")[1];
            const check = jwt.verify(token, process.env.SECRECT_KEY)
            req.user = check
            next()
        } else {
            return res.status(404).json({
                message: "Not A Valid Request"
            })
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}