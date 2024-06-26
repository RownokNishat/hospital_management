const Company = require('../../models/Company Model/company_model')

exports.registration = async (req, res) => {
    const {
        hc_company_englishName,
        hc_company_email,
        hc_company_phoneno,
        hc_company_avatar,
        hc_company_password,
        hc_company_reg_no
    } = req.body

    try {
        const _companyExist = await Company.findOne({
            $and: [{
                $or: [{
                    hc_company_email: hc_company_email
                }, {
                    hc_company_phoneno: hc_company_phoneno
                }]
            }]
        })
        if (_companyExist != null) {
            return res.status(422).json({
                message: "Company Already Exist!!!"
            })
        } else {
            const _company = new Company({
                hc_company_englishName,
                hc_company_email,
                hc_company_phoneno,
                hc_company_avatar,
                hc_company_password,
                hc_company_reg_no
            })
            await _company.save()
            return res.status(201).json({
                message: "Company Registretion Successfull!!!"
            })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}


exports.checkUser = async (req, res) => {
    const { hc_company_email, hc_company_phoneno } = req.body
 
    const companyExist = await Company.findOne({
        $and: [{
            $or: [{
                hc_company_email: hc_company_email
            }, {
                hc_company_phoneno: hc_company_phoneno
            }]
        }]
    })

    if (companyExist != null) {
        const error = new Error({ message: "Company Already Exist!!!" });
        return res.status(500).json(error)
    } else {
        return res.status(200).json({ message: "Can Register" })
    }
}
exports.companyupdateinfo = async (req, res) => {
    const {
        _id,
        hc_company_englishName,
        hc_company_email
    }=req.body
 
    const updateCompany = await Company.updateOne({
        _id: _id,
        $set:{
            hc_company_englishName:hc_company_englishName,
            hc_company_email:hc_company_email,
        }
    })

    if(updateCompany?.acknowledged){
        return res.status(201).json('Update Successfull')
    }else{
        return res.status(404).json('Update Faild. Please try again')
    }
}