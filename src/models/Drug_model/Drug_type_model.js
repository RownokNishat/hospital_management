const mongoose = require('mongoose')

const hc_DRUG_TYPE = new mongoose.Schema({
    hc_drug_type: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("hc_DRUG_TYPE", hc_DRUG_TYPE)