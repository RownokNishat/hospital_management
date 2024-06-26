const mongoose = require('mongoose')

const hc_DRUG = new mongoose.Schema({
    hc_drug_name: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("hc_DRUG", hc_DRUG)