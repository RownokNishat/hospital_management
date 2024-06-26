const CompanyMedicineName = require('../../models/Company Model/company_medicine_name')

exports.company_medicine_name = async (req, res) => {
    const { drugtype, drugName, description, price } = req.body
    try {
        const _companyMedicineName = new CompanyMedicineName({
            drugtype, drugName, description, price, companyID: req.user._id
        })
        await _companyMedicineName.save()
        return res.status(201).json({
            message: "Medicine Added Successfull!!!"
        })
    } catch (err) {
        console.log(err)
    }
}

const drugforCompany = async (id, res) => {
    try {
        const _companyMedicine = await CompanyMedicineName.find({ companyID: id })
        return res.status(200).json(_companyMedicine)
    } catch (err) {
        console.log(err)
    }
}
const drugforPatient = async (res) => {
    try {
        const _companyMedicine = await CompanyMedicineName.find().populate({
            path:'companyID',
            select:['hc_company_englishName']
        })
        return res.status(200).json(_companyMedicine)
    } catch (err) {
        console.log(err)
    }
}

exports.company_medicines = async (req, res) => {
    req.user.role==='Company'? drugforCompany(req.user._id,res) : null
    req.user.role==='Patient'? drugforPatient(res) : null
}

exports.company_medicine_search = async (req, res) => {
    const {drugName} = req.body
    if (req.user.role === "Patient"|| req.user.role === "Company") {
        try {
            const agg = [{
                $search: {
                    autocomplete: {
                        query: drugName,
                        path: "drugName",
                    }
                }
            }, {
                $limit: 20
            }, {
                $project: {
                    _id: 0,
                    drugName: 1
                }
            }]
            const response = await CompanyMedicineName.aggregate(agg)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                message: "Invalid Action"
            })
        }
    } else {
        return res.status(404).json({
            message: "Invalid Action"
        })
    }
}