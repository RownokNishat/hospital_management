const Company = require('../../models/Company Model/company_model')

exports.signin = async (req, res) => {
    const {
        hc_company_email,
        hc_company_phoneno,
        hc_company_password
    } = req.body

    try {
        if (hc_company_email || hc_company_phoneno) {
            const companyExist = await Company.findOne({
                $and: [{
                    $or: [{
                        hc_company_email: hc_company_email
                    }, {
                        hc_company_phoneno: hc_company_phoneno
                    }]
                }]
            })

            if (companyExist === null) {
                return res.status(400).json({ message: "Invalid Action!!!" })
            } else {
                const checkpass = await companyExist.authenticate(hc_company_password)
                if (checkpass) {
                    const token = await companyExist.generateToken()
                    return res.status(200).json({
                        token: token,
                        message: "Login Succesfull!!!"
                    })
                } else {
                    return res.status(400).json({ message: "Invalid Action!!!" })
                }
            }
        } else {
            return res.status(400).json({ message: "Invalid Action!!!" })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

exports.recoverAccount = async (req, res) => {
    const { hc_company_email, hc_company_phoneno } = req.body
    try {
        if (hc_company_phoneno || hc_company_email) {
            const companyExist = await Company.findOne({
                $and: [{
                    $or: [{
                        hc_company_phoneno: hc_company_phoneno
                    }, {
                        hc_company_email: hc_company_email
                    }]
                }]
            }).select({ hc_company_phoneno: 1 })
            return res.status(200).json(companyExist)
        } else {
            return res.status(400).json({ message: "Invalid Action!!!" })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

exports.changePassword = async (req, res) => {
    const { newPassword, id } = req.body
    const companyExist = await Company.findById(id)
    const feedback = await companyExist.changePassword(newPassword)
    return res.status(201).json(feedback)
}