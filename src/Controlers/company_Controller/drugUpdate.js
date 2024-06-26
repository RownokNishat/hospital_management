const Drug = require('../../models/Company Model/company_medicine_name')

exports.getDrugData = async (req, res) => {
    const _drug = await Drug.findOne({ _id: req.headers.drugid, companyID: req.user._id })
    return res.status(200).json(_drug)
}

exports.updateDrugData = async (req, res) => {
    const { drugtype, drugName, description, price } = req.body
    const _drug = await Drug.updateOne(
        {
            _id: req.headers.drugid,
            companyID: req.user._id
        }, {
        $set: {
            drugtype: drugtype,
            drugName: drugName,
            description: description,
            price: price
        }
    })
    if (_drug.acknowledged) {
        return res.status(200).json(_drug)
    } else {
        const error = new Error();
        return res.status(500).json(error)
    }
}

